import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, StatusBar, useColorScheme} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
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
          mapRef.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: lastRegion.latitudeDelta,
              longitudeDelta: lastRegion.longitudeDelta,
            },
            1000,
          );
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
