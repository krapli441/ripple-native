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
import styles from '../styles/SearchScreenStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

function RippleCreatedScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const authToken = useAuthToken();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flexContainer}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <Text style={styles.header}>음악이 남겨졌습니다</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RippleCreatedScreen;
