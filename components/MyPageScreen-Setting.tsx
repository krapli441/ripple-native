// react & react-native
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  Alert,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';

// asyncStorage
import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/MyPageScreenSettingStyles';

function MyPageScreenSetting(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const authToken = useAuthToken();
  const [isBackgroundFeatureEnabled, setIsBackgroundFeatureEnabled] =
    useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleBackgroundFeature = () =>
    setIsBackgroundFeatureEnabled(previousState => !previousState);
  const toggleNotification = () =>
    setIsNotificationEnabled(previousState => !previousState);

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
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>환경설정</Text>

      <View style={styles.settingItemContainer}>
        <View style={styles.settingTitleContainer}>
          <Text style={styles.settingTitle}>백그라운드 기능</Text>
          <Switch
            trackColor={{false: '#191414', true: '#6ADE6C'}}
            thumbColor={isBackgroundFeatureEnabled ? '#191414' : '#f4f3f4'}
            onValueChange={toggleBackgroundFeature}
            value={isBackgroundFeatureEnabled}
          />
        </View>
        <Text style={styles.settingDescription}>
          앱을 사용하지 않을 때 백그라운드 상태에서 {'\n'}다른 사용자가 남긴
          음악을 수집합니다.
        </Text>
      </View>

      <View style={styles.settingItemContainer}>
        <View style={styles.settingTitleContainer}>
          <Text style={styles.settingTitle}>알림</Text>
          <Switch
            trackColor={{false: '#191414', true: '#6ADE6C'}}
            thumbColor={isNotificationEnabled ? '#191414' : '#f4f3f4'}
            onValueChange={toggleNotification}
            value={isNotificationEnabled}
          />
        </View>
        <Text style={styles.settingDescription}>
          다른 사용자가 나에게 좋아요를 보낼 경우{'\n'}알림을 보냅니다.
        </Text>
      </View>
    </View>
  );
}

export default MyPageScreenSetting;
