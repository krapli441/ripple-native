// React & React Native
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  useColorScheme,
  AppState,
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

function MapScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [region, setRegion] = useState<Region | null>(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const fetchCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    fetchCurrentLocation();

    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion(prevRegion => ({
          latitude,
          longitude,
          latitudeDelta: prevRegion ? prevRegion.latitudeDelta : 0.015,
          longitudeDelta: prevRegion ? prevRegion.longitudeDelta : 0.0121,
        }));
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 1000,
        distanceFilter: 1,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(prevRegion => {
      if (prevRegion) {
        return {
          latitude: prevRegion.latitude,
          longitude: prevRegion.longitude,
          latitudeDelta: newRegion.latitudeDelta,
          longitudeDelta: newRegion.longitudeDelta,
        };
      }
      return newRegion;
    });
    console.log('경로 변경됨 : ', newRegion);
  };

  const handleForegroundRegionFetch = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion(prevRegion => {
          if (prevRegion) {
            return {
              ...prevRegion,
              latitude,
              longitude,
            };
          } else {
            return {
              latitude,
              longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
          }
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  // ! 백그라운드 & 포그라운드 추적
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        handleForegroundRegionFetch();
        console.log('포어그라운드로 변경됨');
      }

      console.log('갱신된 값 : ', region);
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [region]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MapView
        provider={PROVIDER_GOOGLE}
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
        cacheEnabled={true}
        pitchEnabled={false}
        loadingEnabled={true}
        onRegionChangeComplete={handleRegionChangeComplete}>
        {region && <Marker coordinate={region} title="Your Position" />}
      </MapView>
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
});

export default MapScreen;
