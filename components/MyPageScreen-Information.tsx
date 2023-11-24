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


// asyncStorage
import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/MyPageScreenInformationStyles';

function MyPageScreenInformation(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const authToken = useAuthToken();


  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {
        // 필요한 경우, 화면이 블러(blur) 될 때 다른 스타일로 되돌릴 수 있습니다
        // 예: StatusBar.setBarStyle('light-content');
      };
    }, []),
  );

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Text style={styles.header}>상세정보</Text>
    </View>
  );
}

export default MyPageScreenInformation;
