// React & React Native
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
  StatusBar,
  useColorScheme,
  AppState,
  TouchableOpacity,
  Easing,
  Text,
  Image,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';
// Libraries
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';

// Components

// Utils
import {fetchInitialLocation, watchUserLocation} from '../utils/locationUtils';
import useAuthToken from '../utils/useAuthToken';

// Types
import {Coords, LocationState} from '../types/locationTypes';

// Style
import styles from '../styles/MapScreenStyles';

const initialLocationState: LocationState = {
  coords: null,
  region: null,
  gpsError: false,
};

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 1000,
  timeout: 5000,
  distanceFilter: 5,
};

const mapViewProps = {
  customMapStyle: MapStyle,
  mapPadding: {bottom: 90, top: 0, right: 0, left: 0},
  scrollEnabled: false,
  zoomEnabled: true,
  rotateEnabled: true,
  minZoomLevel: 15,
  maxZoomLevel: 20,
  showsScale: false,
  pitchEnabled: false,
  cacheEnabled: true,
  loadingEnabled: true,
};

function MapScreen(): React.ReactElement {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const mapRef = useRef<MapView>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [locationState, setLocationState] =
    useState<LocationState>(initialLocationState);
  const {coords, region, gpsError} = locationState;
  const errorAnim = useRef(new Animated.Value(-100)).current;

  const authToken = useAuthToken();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'light-content');
      return () => {
        // 이 부분은 필요하다면 다른 스크린으로 이동할 때의 상태 표시줄 스타일을 복구하는 데 사용할 수 있습니다.
      };
    }, [isDarkMode]),
  );

  // 에러 창 메세지 애니메이션
  const animateError = (show: boolean) => {
    Animated.timing(errorAnim, {
      toValue: show ? 0 : -100,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 애니메이션 중단
    return () => errorAnim.stopAnimation();
  }, []);

  const updateUserLocation = async (newCoords: Coords) => {
    setLocationState(prevState => ({...prevState, coords: newCoords}));
    if (mapRef.current) {
      const currentCamera = await mapRef.current.getCamera();
      const newCamera = {
        ...currentCamera,
        center: newCoords,
      };

      mapRef.current.animateCamera(newCamera, {duration: 150});
    }
  };
  useEffect(() => {
    fetchInitialLocation(setLocationState, GEOLOCATION_OPTIONS, animateError);
  }, []);

  useEffect(() => {
    const clearWatch = watchUserLocation(
      setLocationState,
      updateUserLocation,
      GEOLOCATION_OPTIONS,
      animateError,
    );
    return () => clearWatch();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'light-content'} />
      <MapView
        {...mapViewProps}
        ref={mapRef}
        style={styles.map}
        region={region || undefined}
        provider={PROVIDER_GOOGLE}>
        {coords && (
          <Marker coordinate={coords} title="Your Position">
            <Image
              source={require('../assets/img/ripple_sonar.gif')}
              style={{width: 30, height: 30}}
            />
          </Marker>
        )}
      </MapView>
      {gpsError && (
        <Animated.View
          style={[styles.errorOverlay, {transform: [{translateY: errorAnim}]}]}>
          <Text style={styles.errorMessage}>GPS 신호를 찾는 중입니다...</Text>
        </Animated.View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchModal')}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MapScreen;
