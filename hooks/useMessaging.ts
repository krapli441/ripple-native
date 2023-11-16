import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendTokenToServer} from './sendTokenToServer'; // 별도 파일로 분리된 함수

const useMessaging = () => {
  const initializeMessaging = async () => {
    const storedToken: string | null = await AsyncStorage.getItem('userToken');

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
      await AsyncStorage.setItem('userToken', newToken);
    } catch (error) {
      console.error('Error in token handling:', error);
    }
  };

  return {initializeMessaging};
};

export default useMessaging;
