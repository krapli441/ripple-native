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

function MapScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [coords, setCoords] = useState<Coords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);

  // ? 최초, getCurrentPosition으로 위치 불러온 뒤 region 업데이트함
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoords({latitude, longitude});

        // region 업데이트
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
  }, []);

  // 지속적으로 사용자 위치 추적 및 마커 업데이트
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoords({latitude, longitude});

        // region 업데이트
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

    return () => Geolocation.clearWatch(watchId);
  }, []);

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
        pitchEnabled={false}
        cacheEnabled={true}
        loadingEnabled={true}>
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
