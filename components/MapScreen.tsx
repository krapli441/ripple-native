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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components

// Utils
import {fetchInitialLocation, watchUserLocation} from '../utils/locationUtils';
import useAuthToken from '../utils/useAuthToken';
import {useLocation} from '../utils/LocationContext';
import useRippleActions from '../hooks/useRippleActions';
import useMessaging from '../hooks/useMessaging';
import RippleMarker from '../utils/RippleMarker';

// Types
import {Coords, LocationState} from '../types/locationTypes';

// Style
import styles from '../styles/MapScreenStyles';

// Notification
import messaging from '@react-native-firebase/messaging';
import useBackgroundLocation from '../hooks/useBackgroundLocation';

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
  const {setLocation} = useLocation();
  const authToken = useAuthToken();
  const {ripples, setRipples, fetchNearbyRipples, handleLike} =
    useRippleActions(
      authToken.username ? authToken : {...authToken, username: ''},
    );
  const [unreadCount, setUnreadCount] = React.useState(0);
  useMessaging();
  useBackgroundLocation();
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'light-content');
      return () => {};
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

  useEffect(() => {
    if (coords) {
      fetchNearbyRipples(coords.latitude, coords.longitude, 1000);
    }
  }, [coords]);

  const handleSpotifyPlay = (spotifyUrl: string) => {
    Linking.openURL(spotifyUrl);
  };


  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      return () => {};
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchUnreadNotificationsCount = async () => {
        console.log('useFocusEffect 시작, 알림 있는지 검색 시작');
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId);
        if (userId) {
          try {
            const response = await fetch(
              `http://192.168.0.215:3000/notifications/unread/count/${userId}`,
            );
            if (!response.ok) throw new Error('Network response was not ok');
            const count = await response.json();
            console.log(count);
            setUnreadCount(count);
            console.log('Unread notifications count:', count);
          } catch (error) {
            console.error('Error fetching unread notifications count:', error);
          }
        }
      };

      fetchUnreadNotificationsCount();
    }, []),
  );

  const handleNotificationPress = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />

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
        {ripples.map(ripple => (
          <RippleMarker
            key={ripple._id}
            ripple={ripple}
            handleLike={handleLike}
            handleSpotifyPlay={handleSpotifyPlay}
            authToken={authToken}
          />
        ))}
      </MapView>
      <TouchableOpacity
        onPress={handleNotificationPress}
        style={{
          position: 'absolute',
          top: '8%',
          right: '9%',
          width: 50,
          height: 50,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Icon name="bell" size={24} color="black" />
        {unreadCount > 0 && (
          <View
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              minWidth: 25,
              height: 25,
              backgroundColor: '#1DB954',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              {unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

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
