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
  Linking,
  Button,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';
// Libraries
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';

// Components

// Utils
import {fetchInitialLocation, watchUserLocation} from '../utils/locationUtils';
import useAuthToken from '../utils/useAuthToken';
import {useLocation} from '../utils/LocationContext';

// Types
import {Coords, LocationState} from '../types/locationTypes';
import {Ripple} from '../types/rippleTypes';

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
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const {setLocation} = useLocation();
  const authToken = useAuthToken();
  const [selectedRipple, setSelectedRipple] = useState<Ripple | null>(null);
  const [calloutPosition, setCalloutPosition] = useState({x: 0, y: 0});

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
    setLocation(prevState => ({
      ...prevState,
      latitude: newCoords.latitude,
      longitude: newCoords.longitude,
      latitudeDelta: prevState?.latitudeDelta ?? 0,
      longitudeDelta: prevState?.longitudeDelta ?? 0,
    }));
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
    setLocation;
    fetchInitialLocation(setLocationState, GEOLOCATION_OPTIONS, animateError);
  }, []);

  useEffect(() => {
    const clearWatch = watchUserLocation(
      setLocation,
      setLocationState,
      updateUserLocation,
      GEOLOCATION_OPTIONS,
      animateError,
    );
    return () => clearWatch();
  }, []);

  const fetchNearbyRipples = async (
    latitude: number,
    longitude: number,
    maxDistance: number,
  ) => {
    try {
      const response = await fetch(
        `http://192.168.0.215:3000/ripples/nearby?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`,
      );
      if (response.ok) {
        const ripples: Ripple[] = await response.json();
        setRipples(ripples);
        console.log('사용자 주변 리플 :', ripples);
        console.log('사용자 주변 리플 :', ripples);
      } else {
        console.log('리플 불러오기 실패');
      }
    } catch (error) {
      console.error('fetchNearbyRipples Error:', error);
    }
  };

  useEffect(() => {
    if (coords) {
      fetchNearbyRipples(coords.latitude, coords.longitude, 1000); // 1000은 예시로 사용된 검색 반경입니다. 필요에 따라 조정하세요.
    }
  }, [coords]);

  const handleSpotifyPlay = (spotifyUrl: string) => {
    console.log('버튼 눌림');
    Linking.openURL(spotifyUrl);
  };

  const onMarkerPress = (ripple: Ripple) => {
    setSelectedRipple(ripple);
  };

  // 콜아웃 위치 계산
  const calculateCalloutPosition = async (coordinates: any) => {
    const point = await mapRef.current?.pointForCoordinate(coordinates);
    if (point) {
      setCalloutPosition({x: point.x, y: point.y - 50}); // 마커 위에 콜아웃이 나타나도록 조정
    }
  };

  // 마커 터치 시 콜아웃 표시
  const handleMarkerPress = (ripple: any) => {
    calculateCalloutPosition(ripple.location.coordinates);
    setSelectedRipple(ripple);
  };

  // 콜아웃 바깥 영역 터치 시 숨기기
  const handleHideCallout = () => {
    setSelectedRipple(null);
  };

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
              source={require('../assets/img/ripplemarker.png')}
              style={{width: 30, height: 30}}
            />
          </Marker>
        )}
        {ripples.map((ripple, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: ripple.location.coordinates[1],
              longitude: ripple.location.coordinates[0],
            }}
            onPress={() => handleMarkerPress(ripple)}>
            {/* 마커 이미지 등 */}
          </Marker>
        ))}
      </MapView>

      {selectedRipple && (
        <View style={styles.customPopup}>
          {/* 사용자 정의 팝업 내용 */}
          <Text style={styles.popupText}>{selectedRipple.userId}</Text>
          <Image
            source={{uri: selectedRipple.albumCoverUrl}}
            style={styles.albumCover}
          />
          <Text style={styles.popupTitle}>{selectedRipple.title}</Text>
          <Text style={styles.popupText}>{selectedRipple.artist}</Text>
          {selectedRipple.tag.map((tag, idx) => (
            <Text key={idx}>{tag}</Text>
          ))}
          <TouchableOpacity
            style={styles.popupButton}
            onPress={() =>
              handleSpotifyPlay(selectedRipple.spotifyExternalUrl)
            }>
            <Text style={styles.popupButtonText}>Spotify에서 재생</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.popupButton}
            onPress={() => {
              /* 좋아요 버튼 로직 */
            }}>
            <Text style={styles.popupButtonText}>좋아요</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedRipple && (
        <TouchableOpacity
          style={styles.fullScreenOverlay}
          onPress={handleHideCallout}>
          <View
            style={[
              styles.customPopup,
              {top: calloutPosition.y, left: calloutPosition.x},
            ]}>
            {/* 커스텀 콜아웃 내용 */}
            {/* ... */}
          </View>
        </TouchableOpacity>
      )}
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
