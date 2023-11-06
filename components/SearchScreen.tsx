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
  TextInput,
  Image,
} from 'react-native';
// Libraries
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

// Components

// Util

// Types

// Style
import styles from '../styles/SearchScreenStyle';

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.searchContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />
      <Text style={styles.header}>음악 남기기</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="음악을 검색해주세요"
        placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'} // Placeholder text color depending on the theme
        // Add more props for additional functionality
      />
    </View>
  );
}

export default SearchScreen;
