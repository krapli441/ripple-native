import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {sendTokenToServer} from './sendTokenToServer'; // 별도 파일로 분리된 함수

const useMessaging = () => {
  useEffect(() => {
    const initializeMessaging = async () => {
      const storedToken: string | null = await AsyncStorage.getItem(
        'pushToken',
      );

      if (storedToken) {
        console.log('Push token already obtained and stored.');
        return;
      }

      const authorizationStatus = await messaging().requestPermission();
      if (!authorizationStatus) {
        console.log('Permission not granted');
        return;
      }

      const newToken: string = await messaging().getToken();
      console.log('New FCM Token:', newToken);

      try {
        await sendTokenToServer(newToken);
        await AsyncStorage.setItem('pushToken', newToken);
      } catch (error) {
        console.error('Error in token handling:', error);
      }
    };

    initializeMessaging();
  }, []);
};

export default useMessaging;
