// useMessaging.ts
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const useMessaging = (): void => {
  const initializeMessaging = async (): Promise<void> => {
    const storedToken = await AsyncStorage.getItem('pushToken');
    console.log(storedToken);

    if (storedToken) {
      console.log('Push token already obtained and stored.');
      return;
    }

    const authorizationStatus = await messaging().requestPermission();

    if (!authorizationStatus) {
      console.log('Permission not granted');
      return;
    }

    const newToken = await messaging().getToken();
    console.log('New FCM Token:', newToken);

    try {
      await sendTokenToServer(newToken);
      await AsyncStorage.setItem('pushToken', newToken);
    } catch (error) {
      console.error('Error in token handling:', error);
    }
  };

  const sendTokenToServer = async (token: string): Promise<void> => {
    const userID = await AsyncStorage.getItem('userToken');

    if (!userID) {
      console.error('User ID is not available');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userID}`,
      },
      body: JSON.stringify({pushToken: token}),
    };

    try {
      const response = await fetch(
        'http://192.168.0.215:3000/auth/spotify/push-token',
        requestOptions,
      );

      if (!response.ok) {
        console.error(
          `Response Error: ${response.status} ${response.statusText}`,
        );
        const errorBody = await response.text();
        console.error(`Error Body: ${errorBody}`);
        throw new Error('Failed to send token to server');
      }

      const responseData = await response.json();
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };

  useEffect(() => {
    initializeMessaging();
  }, []);
};

export default useMessaging;
