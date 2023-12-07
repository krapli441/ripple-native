import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, StatusBar, Text, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {requestUserPermission} from '../hooks/useMessaging';

// Style
import styles from '../styles/MyPageScreenSettingStyles';

function MyPageScreenSetting() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotification = async (value: boolean) => {
    setIsNotificationEnabled(value);
    await AsyncStorage.setItem('notificationEnabled', value ? 'true' : 'false');
    console.log(`Notification Enabled: ${value}`);

    if (value) {
      // 사용자가 알림을 활성화한 경우 FCM 토큰 요청
      requestUserPermission();
    } else {
      // 사용자가 알림을 비활성화한 경우 FCM 토큰 삭제
      messaging().deleteToken();
    }
  };

  useEffect(() => {
    const getNotificationSetting = async () => {
      const setting = await AsyncStorage.getItem('notificationEnabled');
      setIsNotificationEnabled(setting === 'true');
    };

    getNotificationSetting();
  }, []);

  useLayoutEffect(() => {
    AsyncStorage.getItem('notificationEnabled').then(enabled => {
      if (!JSON.parse(enabled ?? 'true')) {
        setIsNotificationEnabled(false);
      }
    });
  }, []);

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>환경설정</Text>
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
