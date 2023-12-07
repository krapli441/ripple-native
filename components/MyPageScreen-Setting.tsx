import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  Text,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Style
import styles from '../styles/MyPageScreenSettingStyles';

function MyPageScreenSetting() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotification = async (value: boolean) => {
    setIsNotificationEnabled(value);
    await AsyncStorage.setItem('notificationEnabled', value ? 'true' : 'false');
    console.log(`Notification Enabled: ${value}`);
  };

  useEffect(() => {
    const getNotificationSetting = async () => {
      const setting = await AsyncStorage.getItem('notificationEnabled');
      setIsNotificationEnabled(setting === 'true');
    };

    getNotificationSetting();
  }, []);

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>환경설정</Text>
      <View style={styles.settingItemContainer}>
        <View style={styles.settingTitleContainer}>
          <Text style={styles.settingTitle}>알림</Text>
          <Switch
            trackColor={{ false: '#191414', true: '#6ADE6C' }}
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
