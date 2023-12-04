// react & react-native
import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

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
      fetchNotifications();
      return () => {};
    }, []),
  );

  const renderItem = ({item}: {item: NotificationItem}) => {
    // 메시지를 "님이" 기준으로 나누기
    const messageParts = item.message.split('님이');
    const firstPart = messageParts[0] + '님이';
    const secondPart = '회원님이 남긴 음악을 좋아합니다.';

    const handleDelete = async (notificationId: string) => {
      try {
        const response = await fetch(
          `http://192.168.0.215:3000/notifications/${notificationId}`,
          {method: 'DELETE'},
        );

        if (response.ok) {
          // UI에서 알림 제거
          setNotifications(
            notifications.filter(notif => notif._id !== notificationId),
          );
        } else {
          console.error('Failed to delete notification');
        }
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    };

    const DeleteAction = ({progress, onPress}: any) => {
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0], // Adjust these values as needed
      });

      return (
        <Animated.View style={{flex: 1, transform: [{translateX}]}}>
          <TouchableOpacity
            onPress={() => onPress(item._id)}
            style={styles.deleteAction}>
            <Icon name="trash" size={20} color="white" />
            <Text style={styles.deleteActionText}>삭제</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <DeleteAction progress={progress} onPress={handleDelete} />
        )}
        rightThreshold={60}>
        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>{firstPart}</Text>
            <Text style={styles.notificationText}>{secondPart}</Text>
          </View>
          <Image source={{uri: item.albumCoverUrl}} style={styles.albumCover} />
        </View>
      </Swipeable>
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
