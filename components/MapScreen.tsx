// React & React Native
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
  StatusBar,
  useColorScheme,
  TouchableOpacity,
  Easing,
  Text,
  Image,
  Linking,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';
// Libraries
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  CalloutSubview,
} from 'react-native-maps';
import {mapViewProps} from '../maps/MapScreen-mapViewProps';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        const newRipples: Ripple[] = await response.json();

        // 현재 상태의 리플과 새로 가져온 리플을 비교하여 변경 사항이 있는지 확인
        const updatedRipples = newRipples.map(newRipple => {
          const existingRipple = ripples.find(r => r._id === newRipple._id);
          if (
            existingRipple &&
            (existingRipple.location.coordinates[0] !==
              newRipple.location.coordinates[0] ||
              existingRipple.location.coordinates[1] !==
                newRipple.location.coordinates[1])
          ) {
            // 좌표가 변경된 경우에만 새로운 객체를 반환
            return newRipple;
          }
          return existingRipple || newRipple;
        });

        setRipples(updatedRipples);
      } else {
        console.log('리플 불러오기 실패');
      }
    } catch (error) {
      console.error('fetchNearbyRipples Error:', error);
    }
  };

  useEffect(() => {
    if (coords) {
      fetchNearbyRipples(coords.latitude, coords.longitude, 1000);
    }
  }, [coords]);

  const handleSpotifyPlay = (spotifyUrl: string) => {
    console.log('Spotify Play Button Pressed');
    Linking.openURL(spotifyUrl);
  };

  const handleLike = (rippleId: string) => {
    console.log('Like Button Pressed for Ripple ID:', rippleId);
    // Implement your logic to increase the likes count in the database
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
          <Marker coordinate={coords}>
            <Image
              source={require('../assets/img/ripplemarker.png')}
              style={{width: 30, height: 30}}
            />
          </Marker>
        )}
        {ripples.map((ripple, index) => (
          <Marker
            style={{padding: 10}}
            key={index}
            coordinate={{
              latitude: ripple.location.coordinates[1],
              longitude: ripple.location.coordinates[0],
            }}>
            <Image
              source={require('../assets/img/otherUserMarker.png')}
              style={{width: 30, height: 30}}
            />
            <Callout tooltip={true} style={styles.calloutStyle}>
              <Text style={styles.userInfo}>{ripple.userId}</Text>
              <View style={styles.secondRow}>
                <Image
                  source={{uri: ripple.albumCoverUrl}}
                  style={styles.albumCover}
                />
                <View style={styles.trackInfo}>
                  <Text
                    style={styles.titleText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {ripple.title}
                  </Text>
                  <Text
                    style={styles.artistText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {ripple.artist}
                  </Text>
                  <View style={styles.tagContainer}>
                    {ripple.tag.map((tag, idx) => (
                      <Text style={styles.tagText} key={idx}>
                        #{tag}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.thirdRow}>
                <CalloutSubview
                  onPress={() => handleSpotifyPlay(ripple.spotifyExternalUrl)}
                  style={styles.calloutSpotifyButton}>
                  <TouchableOpacity style={styles.buttonLayout}>
                    <Icon name="spotify" size={20} color="black" />
                    <Text style={styles.calloutButtonText}>
                      Spotify에서 재생
                    </Text>
                  </TouchableOpacity>
                </CalloutSubview>
                <CalloutSubview
                  onPress={() => handleLike(ripple._id)}
                  style={styles.calloutLikeButton}>
                  <TouchableOpacity style={styles.buttonLayout}>
                    <Icon name="heart" size={20} color="white" />
                    <Text style={styles.calloutLikeButtonText}>좋아요</Text>
                  </TouchableOpacity>
                </CalloutSubview>
              </View>
            </Callout>
          </Marker>
        ))}
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
