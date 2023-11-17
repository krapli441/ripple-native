// react & react-native
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';
import {TrackDetails} from '../types/navigationTypes';

// asyncStorage
import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/SearchScreenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

function NotificationScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // 키보드를 숨기는 함수
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <Text style={styles.header}>알림</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default NotificationScreen;
