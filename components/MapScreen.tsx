import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  useColorScheme,
  AppState,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';
import Geolocation from '@react-native-community/geolocation';

type Coords = {
  latitude: number;
  longitude: number;
};

type Region = Coords & {
  latitudeDelta: number;
  longitudeDelta: number;
};

const fetchCurrentLocation = (
  onSuccess: (positionData: any) => void,
  onError: (error: any) => void,
) => {
  Geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
  });
};

const watchLocation = (
  onUpdate: (positionData: any) => void,
  onError: (error: any) => void,
) => {
  return Geolocation.watchPosition(onUpdate, onError, {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
    distanceFilter: 10,
  });
};

function MapScreen() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const isDarkMode = useColorScheme() === 'dark';
  const [coords, setCoords] = useState<Coords>({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const positionAnim = new Animated.ValueXY({
    x: coords.longitude,
    y: coords.latitude,
  });

  useEffect(() => {
    fetchCurrentLocation(
      positionData => {
        const {latitude, longitude} = positionData.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
        positionAnim.setValue({x: latitude, y: longitude});
      },
      error => {
        // Handle error, maybe notify the user
        console.log(error);
      },
    );

    const watchId = watchLocation(
      positionData => {
        const {latitude, longitude} = positionData.coords;
        setCoords({latitude, longitude});
        Animated.timing(positionAnim, {
          toValue: {x: latitude, y: longitude},
          duration: 500,
          useNativeDriver: false,
        }).start();
      },
      error => {
        // Handle error, maybe notify the user
        console.log(error);
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        style={styles.map}
        region={region}
        mapPadding={{bottom: 50, top: 0, right: 0, left: 0}}>
        <Marker.Animated coordinate={coords} title="My Location" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
