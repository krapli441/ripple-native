// React & React Native
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
// Others
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from '../maps/customMapStyle.json';
import Geolocation from '@react-native-community/geolocation';

function MapScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? 'black' : 'wshite',
  };

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          ...region,
          latitude,
          longitude,
        });
        console.log('Region updated: ', region);
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
        customMapStyle={mapStyle}
        style={styles.map}
        region={region}></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 'auto',
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
