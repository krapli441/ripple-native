import React, {useEffect, useState} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';
import Geolocation from '@react-native-community/geolocation';

function MapScreen() {
  const [coords, setCoords] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [region, setRegion] = useState({
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
    Geolocation.getCurrentPosition(
      positionData => {
        const {latitude, longitude} = positionData.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
        console.log(
          `Tracking user - Region: latitude=${latitude}, longitude=${longitude}`,
        );
        positionAnim.setValue({x: latitude, y: longitude});
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );

    const watchId = Geolocation.watchPosition(
      positionData => {
        const {latitude, longitude} = positionData.coords;
        console.log(
          `Tracking user - Marker: latitude=${latitude}, longitude=${longitude}`,
        );
        setCoords({latitude, longitude});
        Animated.timing(positionAnim, {
          toValue: {x: latitude, y: longitude},
          duration: 500,
          useNativeDriver: false,
        }).start();
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyle}
        style={styles.map}
        region={region}>
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
