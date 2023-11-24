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
import styles from '../styles/MyPageScreenAccountStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

function MyPageScreenAccount(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {username, userEmail} = useAuthToken(); // username과 email을 useAuthToken에서 가져옵니다.

  const handleDeleteAccountPress = () => {
    // 계정 삭제 로직을 여기에 추가합니다.
    // 예: Alert.alert('계정 삭제', '정말 계정을 삭제하시겠습니까?', ...)
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
      <Text style={styles.header}>계정</Text>
      <Text style={styles.infoText}>사용자 이름: {username}</Text>
      {/* 사용자 이름 표시 */}
      <Text style={styles.infoText}>이메일: {userEmail}</Text>
      {/* 이메일 표시 */}
      <TouchableOpacity onPress={handleDeleteAccountPress}>
        <Text style={styles.deleteAccountText}>
          계정을 탈퇴하고 계정을 영구 삭제하려면 여기를 클릭하세요
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default MyPageScreenAccount;
