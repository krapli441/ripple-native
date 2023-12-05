// react & react-native
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';
import type {NavigationProp} from '@react-navigation/native';

import {useFocusEffect} from '@react-navigation/native';

// Style
import styles from '../styles/TutorialScreenStyles';

function TutorialScreenOne(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, []),
  );

  const handleNextPress = () => {
    navigation.navigate('TutorialScreenTwo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ripple은</Text>
        <Text style={styles.headerText}>음악 공유 애플리케이션이에요</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/img/ripple_logo_incircle.png')}
          style={styles.logo}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default TutorialScreenOne;
