// react & react-native
import React, {useState} from 'react';
import {View, StatusBar, Text, useColorScheme, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';

// asyncStorage
import useAuthToken from '../utils/useAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Style
import styles from '../styles/MyPageScreenAccountStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

type MyPageScreenAccountProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

function MyPageScreenAccount({
  setIsAuthenticated,
}: MyPageScreenAccountProps): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {username, userEmail} = useAuthToken(); // username과 email을 useAuthToken에서 가져옵니다.

  const handleDeleteAccountPress = () => {
    navigation.navigate('DeleteAccountScreen');
    // 예: Alert.alert('계정 삭제', '정말 계정을 삭제하시겠습니까?', ...)
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠어요?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '로그아웃',
        onPress: async () => {
          await AsyncStorage.clear();
          setIsAuthenticated(false); // 인증 상태를 false로 설정
          // navigation.navigate('Home');
        },
      },
    ]);
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Text style={styles.header}>계정</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>사용자 이름</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{username}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>이메일</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.deleteAccountContainer}>
        <Text style={styles.deleteAccountText}>
          계정을 탈퇴하고 데이터를 영구 삭제하려면{' '}
          <Text
            style={styles.deleteAccountLink}
            onPress={handleDeleteAccountPress}>
            여기를 터치하세요.
          </Text>
        </Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MyPageScreenAccount;
