// react & react-native
import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';

// asyncStorage
import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/SearchScreenStyles';

function NotificationScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [notifications, setNotifications] = useState([]);
  const userId = useAuthToken().userId;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.215:3000/notifications/${userId}`,
        );
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setNotifications(data);
        console.log(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId]);

  // 키보드를 숨기는 함수
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <Text style={styles.header}>알림</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default NotificationScreen;
