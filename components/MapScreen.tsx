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

// Types
import {Coords, LocationState} from '../types/locationTypes';

// Style
import styles from '../styles/MapScreenStyles';

// Notification
import messaging from '@react-native-firebase/messaging';

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

  async function initializeMessaging() {
    const storedToken = await AsyncStorage.getItem('pushToken');
    console.log(storedToken);

    if (storedToken) {
      console.log('Push token already obtained and stored.');
      return;
    }

    const authorizationStatus = await messaging().requestPermission();

    if (!authorizationStatus) {
      console.log('Permission not granted');
      return;
    }

    const newToken = await messaging().getToken();
    console.log('New FCM Token:', newToken);

    try {
      await sendTokenToServer(newToken);
      await AsyncStorage.setItem('pushToken', newToken);
    } catch (error) {
      console.error('Error in token handling:', error);
    }
  }

  async function sendTokenToServer(token: string) {
    const userID = await AsyncStorage.getItem('userToken');

    if (!userID) {
      console.error('User ID is not available');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userID}`,
      },
      body: JSON.stringify({pushToken: token}),
    };

    try {
      console.log('Sending request with:', requestOptions);
      const response = await fetch(
        'http://192.168.0.215:3000/auth/spotify/push-token',
        requestOptions,
      );

      if (!response.ok) {
        console.error(
          `Response Error: ${response.status} ${response.statusText}`,
        );
        const errorBody = await response.text();
        console.error(`Error Body: ${errorBody}`);
        throw new Error('Failed to send token to server');
      }

      const responseData = await response.json();
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  }

  useEffect(() => {
    initializeMessaging();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      return () => {};
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchUnreadNotificationsCount = async () => {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          try {
            const response = await fetch(
              `http://192.168.0.215:3000/notifications/unread/count/${userId}`,
            );
            if (!response.ok) throw new Error('Network response was not ok');

            const count = await response.json();
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
                  onPress={() => {
                    if (authToken.userId) {
                      handleLike(ripple._id, authToken.userId);
                    }
                  }}
                  style={styles.calloutLikeButton}>
                  <TouchableOpacity style={styles.buttonLayout}>
                    <Icon
                      name={
                        ripple.likedUsers.includes(authToken.username ?? '')
                          ? 'check'
                          : 'heart'
                      }
                      size={20}
                      color="white"
                    />
                    <Text style={styles.calloutLikeButtonText}>좋아요</Text>
                  </TouchableOpacity>
                </CalloutSubview>
              </View>
            </Callout>
          </Marker>
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
