import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


export const requestUserPermission = async (): Promise<void> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  const notificationEnabled = await AsyncStorage.getItem('notificationEnabled');

  if (enabled && JSON.parse(notificationEnabled ?? 'true')) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);
      await sendTokenToServer(fcmToken);
      await AsyncStorage.setItem('pushToken', fcmToken);
    } catch (error) {
      console.error('Error in token handling:', error);
    }
  }
};

export const sendTokenToServer = async (token: string): Promise<void> => {
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
      'https://ripple.testpilotapp.com/auth/spotify/push-token',
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

const useMessaging = (): void => {

  useEffect(() => {
    requestUserPermission();
  }, []);
};

export default useMessaging;
