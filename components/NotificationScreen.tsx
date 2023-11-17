// react & react-native
import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Style
import styles from '../styles/NotificationScreenStyles';

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

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  const renderItem = ({item}) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>
        {item.message}
        {/* {item.senderId}님이  */}
      </Text>
      <Image source={{uri: item.albumCoverUrl}} style={styles.albumCover} />
    </View>
  );

  return (
    <View style={styles.searchContainer}>
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
