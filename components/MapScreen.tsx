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
import Geolocation from '@react-native-community/geolocation';

// Components
import MapStyle from '../maps/customMapStyle.json';
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
  const [coords, setCoords] = useState<Coords | null>(null);
  const [lastRegion, setLastRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView>(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const handleRegionChangeComplete = (newRegion: Region) => {
    setLastRegion(newRegion);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoords({latitude, longitude});
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoords({latitude, longitude});

        if (mapRef.current && lastRegion) {
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: lastRegion.latitudeDelta,
            longitudeDelta: lastRegion.longitudeDelta,
          };
          mapRef.current.animateToRegion(newRegion, 1000); // 애니메이션 지속 시간
        }
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [lastRegion]);

  useEffect(() => {
    let watchId: number;

    const fetchCurrentLocation = () => {
      watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCoords({latitude, longitude});

          if (mapRef.current && lastRegion) {
            const newRegion = {
              latitude,
              longitude,
              latitudeDelta: lastRegion.latitudeDelta,
              longitudeDelta: lastRegion.longitudeDelta,
            };
            mapRef.current.animateToRegion(newRegion, 1000); // 애니메이션 지속 시간
          }
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 1,
        },
      );
    };

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        fetchCurrentLocation();
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    // 초기 위치와 watch 설정
    fetchCurrentLocation();

    return () => {
      subscription.remove();
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [lastRegion]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        style={styles.map}
        mapPadding={{bottom: 90, top: 0, right: 0, left: 0}}
        zoomEnabled={true}
        rotateEnabled={true}
        scrollEnabled={false}
        minZoomLevel={15}
        maxZoomLevel={20}
        showsScale={false}
        pitchEnabled={false}
        cacheEnabled={true}
        loadingEnabled={true}
        onRegionChangeComplete={handleRegionChangeComplete}>
        {coords && <Marker coordinate={coords} title="Your Position" />}
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
