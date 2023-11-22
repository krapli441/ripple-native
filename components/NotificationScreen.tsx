// react & react-native
import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  FlatList,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Style
import styles from '../styles/NotificationScreenStyles';

interface NotificationItem {
  _id: string;
  senderId: string;
  message: string;
  albumCoverUrl: string;
}

function NotificationScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(
          `http://192.168.0.215:3000/notifications/${userId}`,
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const markNotificationsAsRead = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      try {
        await fetch(
          `http://192.168.0.215:3000/notifications/${userId}/mark-read`,
          {
            method: 'PATCH',
          },
        );
      } catch (error) {
        console.error('Error updating notification read status:', error);
      }
    };

    markNotificationsAsRead();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  const renderItem = ({item}: {item: NotificationItem}) => {
    // 메시지를 "님이" 기준으로 나누기
    const messageParts = item.message.split('님이');
    const firstPart = messageParts[0] + '님이';
    const secondPart = '회원님이 남긴 음악을 좋아합니다.';

    return (
      <View style={styles.notificationItem}>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationText}>{firstPart}</Text>
          <Text style={styles.notificationText}>{secondPart}</Text>
        </View>
        <Image source={{uri: item.albumCoverUrl}} style={styles.albumCover} />
      </View>
    );
  };
  return (
    <View style={styles.notificationContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Text style={styles.header}>알림</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

export default NotificationScreen;
