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
import styles from '../styles/TutorialScreenThreeStyles';

type TutorialScreenProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

function TutorialScreenThree({
  setIsAuthenticated,
}: TutorialScreenProps): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, []),
  );

  // const handleNextPress = () => {
  //   navigation.navigate('Ripple');
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>다른 사람이 남긴 음악도</Text>
        <Text style={styles.headerText}>확인할 수 있어요</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/img/tutorial_image_2.png')}
          style={styles.logo}
        />
        <Text style={styles.descriptionText}>음악을 공유하고 소통하며</Text>
        <Text style={styles.descriptionText}>스펙트럼을 넓혀보세요!</Text>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setIsAuthenticated(true)}>
        <Text style={styles.nextButtonText}>시작하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default TutorialScreenThree;
