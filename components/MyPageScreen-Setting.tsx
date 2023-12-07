// react & react-native
import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  Alert,
  Switch,
  Linking,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

// asyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Style
import styles from '../styles/MyPageScreenSettingStyles';

function MyPageScreenSetting(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [isBackgroundFeatureEnabled, setIsBackgroundFeatureEnabled] =
    useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  // const toggleBackgroundFeature = () =>
  //   setIsBackgroundFeatureEnabled(previousState => !previousState);

  const toggleNotification = async () => {
    // 사용자가 알림을 활성화하려고 시도할 때
    if (!isNotificationEnabled) {
      const settings = await messaging().requestPermission();
      if (
        settings === messaging.AuthorizationStatus.AUTHORIZED ||
        settings === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        // 알림이 이미 활성화된 경우
        setIsNotificationEnabled(true);
      } else {
        // 시스템 설정에서 알림이 비활성화된 경우
        Alert.alert(
          '알림 활성화 필요',
          '알림을 받으려면 시스템 설정에서 알림을 활성화해야 합니다.',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '설정으로 이동',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        // 알림이 이미 활성화된 경우
        setIsNotificationEnabled(true);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  useEffect(() => {
    const getNotificationPermission = async () => {
      const permissionStatus = await AsyncStorage.getItem(
        'notificationPermission',
      );
      setIsNotificationEnabled(permissionStatus === '1');
    };

    getNotificationPermission();
  }, []);


  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>환경설정</Text>

      {/* <View style={styles.settingItemContainer}>
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
      </View> */}

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
