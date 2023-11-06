// React & React Native
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
  StatusBar,
  useColorScheme,
  AppState,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Easing,
  Text,
  Image,
} from 'react-native';
// Libraries
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';

// Components
import NavigationTabBar from './Navigation';

// Util

// Types

// Style
import styles from '../styles/MapScreenStyles';

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationTabBar />
    </View>
  );
}

export default SearchScreen;
