// react & react-native
import React, {useState} from 'react';
import {View, StatusBar, Text, useColorScheme, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/DeleteAccountScreenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

function DeleteAccountScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Text style={styles.header}>계정 삭제</Text>
    </View>
  );
}

export default DeleteAccountScreen;
