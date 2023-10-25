// React & React Native
import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  useColorScheme,
  Easing,
  Text,
} from 'react-native';
// Libraries
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';

// Components
import CustomTabBar from './Navigation';

// Hooks
import useGeolocation from '../hooks/useGeolocation';

function MapScreen(): React.ReactElement {
  const mapRef = useRef<MapView>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const errorAnim = useRef(new Animated.Value(-100)).current; // 에러 메시지 위치 애니메이션

  const {coords, region, gpsError} = useGeolocation();

  const animateError = (show: boolean) => {
    Animated.timing(errorAnim, {
      toValue: show ? 0 : -100,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const updateUserLocation = async (newCoords: typeof coords) => {
    if (mapRef.current && newCoords) {
      const currentCamera = await mapRef.current.getCamera();
      const newCamera = {
        ...currentCamera,
        center: newCoords,
      };
      mapRef.current.animateCamera(newCamera, {duration: 500});
    }
  };

  useEffect(() => {
    if (coords) {
      updateUserLocation(coords);
    }
    if (gpsError) {
      animateError(true);
    }
  }, [coords, gpsError]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
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
      {gpsError && (
        <Animated.View
          style={[styles.errorOverlay, {transform: [{translateY: errorAnim}]}]}>
          <Text style={styles.errorMessage}>GPS 신호를 찾을 수 없습니다.</Text>
        </Animated.View>
      )}
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
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    padding: 15,
    zIndex: 1,
  },
  errorMessage: {
    fontSize: 18,
    marginTop: 30,
    color: 'white',
    textAlign: 'center',
  },
});

export default MapScreen;
