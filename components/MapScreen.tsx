// React & React Native
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  useColorScheme,
  AppState,
  Easing,
  Text,
} from 'react-native';
// Libraries
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';
import Geolocation from '@react-native-community/geolocation';

// Components
import CustomTabBar from './Navigation';

type Coords = {
  latitude: number;
  longitude: number;
};

type Region = Coords & {
  latitudeDelta: number;
  longitudeDelta: number;
};

type LocationState = {
  coords: Coords | null;
  region: Region | null;
  gpsError: boolean;
};

const initialLocationState: LocationState = {
  coords: null,
  region: null,
  gpsError: false,
};

function MapScreen(): React.ReactElement {
  const mapRef = useRef<MapView>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [locationState, setLocationState] =
    useState<LocationState>(initialLocationState);
  const {coords, region, gpsError} = locationState;
  const errorAnim = useRef(new Animated.Value(-100)).current; // 에러 메시지 위치 애니메이션

  // 에러 창 메세지 애니메이션
  const animateError = (show: boolean) => {
    Animated.timing(errorAnim, {
      toValue: show ? 0 : -100,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // geolocaion 옵션
  const geolocationCommonOptions = {
    enableHighAccuracy: true,
    maximumAge: 1000,
  };

  // ? 사용자의 위치가 업데이트될 때 호출되는 함수
  const updateUserLocation = async (newCoords: Coords) => {
    if (mapRef.current) {
      // ? 현재 카메라 상태 가져오기
      const currentCamera = await mapRef.current.getCamera();

      // ? 새로운 카메라 상태 설정
      const newCamera = {
        ...currentCamera,
        center: newCoords,
      };

      // 카메라 상태 업데이트 (애니메이션 적용)
      mapRef.current.animateCamera(newCamera, {duration: 500});
    }
  };

  // ? 최초, getCurrentPosition으로 위치 불러온 뒤 region 업데이트함
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const newCoords = {latitude, longitude};
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };
        setLocationState({
          coords: newCoords,
          region: newRegion,
          gpsError: false,
        });
      },
      error => {
        console.log(error);
        setLocationState(prevState => ({...prevState, gpsError: true}));
        animateError(true);
      },
      {
        ...geolocationCommonOptions,
        timeout: 2000,
        distanceFilter: 3,
      },
    );
  }, []);

  // ? 지속적으로 사용자 위치 추적 및 마커 업데이트
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const newCoords = {latitude, longitude};
        setLocationState(prevState => ({...prevState, coords: newCoords}));
        updateUserLocation(newCoords);
      },
      error => {
        console.log(error);
        setLocationState(prevState => ({...prevState, gpsError: true}));
        animateError(true);
      },
      {
        ...geolocationCommonOptions,
        timeout: 2000,
        distanceFilter: 3,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        customMapStyle={MapStyle}
        style={styles.map}
        region={region || undefined}
        mapPadding={{bottom: 90, top: 0, right: 0, left: 0}}
        scrollEnabled={false}
        zoomEnabled={true}
        rotateEnabled={true}
        minZoomLevel={15}
        maxZoomLevel={20}
        showsScale={false}
        pitchEnabled={false}
        cacheEnabled={true}
        loadingEnabled={true}>
        {coords && <Marker coordinate={coords} title="Your Position" />}
      </MapView>
      {gpsError && (
        <Animated.View
          style={[styles.errorOverlay, {transform: [{translateY: errorAnim}]}]}>
          <Text style={styles.errorMessage}>GPS 신호를 찾을 수 없습니다.</Text>
        </Animated.View>
      )}
      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    padding: 15,
    zIndex: 1,
  },
  errorMessage: {
    fontSize: 18,
    marginTop: 30,
    color: 'white',
    textAlign: 'center',
  },
});

export default MapScreen;
