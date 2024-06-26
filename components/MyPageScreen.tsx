// react & react-native
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,

} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons 아이콘 세트를 사용

// types
import {RootStackParamList} from '../types/navigationTypes';

// asyncStorage
import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/MyPageScreenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

function MyPageScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const authToken = useAuthToken();

  const handleAccountPress = () => {
    navigation.navigate('MyRippleScreenAccount');
    // 계정 정보 화면으로 이동
  };

  const handleSettingsPress = () => {
    navigation.navigate('MyRippleScreenSetting');
    // 환경 설정 화면으로 이동
  };

  // const handleInformationPress = () => {
  //   navigation.navigate('MyRippleScreenInformation');
  //   // 상세 정보 화면으로 이동
  // };

  // const handleCustomerServicePress = () => {
  //   navigation.navigate('MyRippleScreenCustomerService');
  //   // 고객센터 화면으로 이동
  // };

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
      <Text style={styles.header}>내 정보</Text>

      <TouchableOpacity style={styles.menuItem} onPress={handleAccountPress}>
        <Text style={styles.menuText}>계정</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
        <Text style={styles.menuText}>환경 설정</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.menuItem} onPress={handleInformationPress}>
        <Text style={styles.menuText}>상세 정보</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleCustomerServicePress}>
        <Text style={styles.menuText}>고객센터</Text>
        <Icon name="chevron-forward-outline" size={20} />
      </TouchableOpacity> */}
    </View>
  );
}

export default MyPageScreen;
