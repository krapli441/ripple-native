// React & React Native
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
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

type PositionData = {
  coords: Coords;
};

type SetRegion = React.Dispatch<React.SetStateAction<Region>>;

const fetchCurrentLocation = (
  onSuccess: (positionData: PositionData) => void,
  onError: (error: any) => void,
) => {
  Geolocation.getCurrentPosition(onSuccess, onError, {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
  });
};

const watchLocation = (
  onUpdate: (positionData: PositionData) => void,
  onError: (error: any) => void,
) => {
  return Geolocation.watchPosition(onUpdate, onError, {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 1000,
    distanceFilter: 5,
  });
};

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

function updateLocation(
  positionData: PositionData,
  setRegion: SetRegion,
  positionAnim: Animated.ValueXY,
) {
  const {latitude, longitude} = positionData.coords;
  setRegion({
    latitude,
    longitude,
    latitudeDelta: initialRegion.latitudeDelta,
    longitudeDelta: initialRegion.longitudeDelta,
  });
  Animated.timing(positionAnim, {
    toValue: {x: latitude, y: longitude},
    duration: 500,
    useNativeDriver: false,
  }).start();
}

function MapScreen() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const isDarkMode = useColorScheme() === 'dark';
  const [coords, setCoords] = useState<Coords>({
    latitude: 37.5666612,
    longitude: 126.9783785,
  });
  const [region, setRegion] = useState<Region>({
    latitude: 37.5666612,
    longitude: 126.978378,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const positionAnim = useRef(
    new Animated.ValueXY({
      x: coords.longitude,
      y: coords.latitude,
    }),
  ).current;

  useEffect(() => {
    const onSuccess = (positionData: PositionData) => {
      updateLocation(positionData, setRegion, positionAnim);
    };
    const onError = (error: any) => {
      console.log(error);
    };

    fetchCurrentLocation(onSuccess, onError);

    const watchId = watchLocation((positionData: PositionData) => {
      const {latitude, longitude} = positionData.coords;
      setCoords({latitude, longitude});
      updateLocation(positionData, setRegion, positionAnim);
    }, onError);

    return () => Geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        fetchCurrentLocation(
          positionData => updateLocation(positionData, setRegion, positionAnim),
          error => console.log(error),
        );
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
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
        mapPadding={{bottom: 90, top: 0, right: 0, left: 0}}
        scrollEnabled={false}
        zoomEnabled={true}
        rotateEnabled={true}
        minZoomLevel={15}
        maxZoomLevel={20}
        showsScale={false}
        cacheEnabled={true}
        loadingEnabled={true}>
        <Marker.Animated coordinate={coords} title="Your Position" />
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
