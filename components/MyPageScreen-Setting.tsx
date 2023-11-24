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
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons 아이콘 세트를 사용

// types
import {RootStackParamList} from '../types/navigationTypes';
import {TrackDetails} from '../types/navigationTypes';

// asyncStorage
import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/MyPageScreenSettingStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

function MyPageScreenSetting(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const authToken = useAuthToken();

  const handleAccountPress = () => {
    // 계정 정보 화면으로 이동
  };

  const handleSettingsPress = () => {
    // 환경 설정 화면으로 이동
  };

  const handleDetailsPress = () => {
    // 상세 정보 화면으로 이동
  };

  const handleSupportPress = () => {
    // 고객센터 화면으로 이동
  };

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
      <Text style={styles.header}>환경설정</Text>
      {/* 
      <TouchableOpacity style={styles.menuItem} onPress={handleAccountPress}>
        <Text style={styles.menuText}>계정</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
        <Text style={styles.menuText}>환경 설정</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleDetailsPress}>
        <Text style={styles.menuText}>상세 정보</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleSupportPress}>
        <Text style={styles.menuText}>고객센터</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity> */}
    </View>
  );
}

export default MyPageScreenSetting;
