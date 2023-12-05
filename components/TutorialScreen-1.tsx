// react & react-native
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

// Style
import styles from '../styles/TutorialScreenStyles';


function LikedRippleScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';


  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191414'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
}

export default LikedRippleScreen;
