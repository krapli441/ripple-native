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

import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';
import type {NavigationProp} from '@react-navigation/native';

// Style
import styles from '../styles/TutorialScreenTwoStyles';

function TutorialScreenTwo(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, []),
  );

  const handleNextPress = () => {
    navigation.navigate('TutorialScreenThree');
  };

  return (
<SafeAreaView style={styles.container}>
  <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>현재 위치에</Text>
    <Text style={styles.headerText}>여러분이 좋아하는 음악을</Text>
    <Text style={styles.headerText}>남길 수 있어요</Text>
  </View>

  <View style={styles.imageContainer}>
    <Image
      source={require('../assets/img/tutorial_image_1.png')}
      style={styles.logo}
    />
    <Text style={styles.descriptionText}>지도에 남겨진 음악은</Text>
    <Text style={styles.descriptionText}>24시간 뒤 사라져요</Text>
  </View>

  <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
    <Text style={styles.nextButtonText}>다음</Text>
  </TouchableOpacity>
</SafeAreaView>

  );
}

export default TutorialScreenTwo;
