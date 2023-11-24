import {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './AuthContext'; // 앱의 전역 상태를 관리

const useAuthToken = () => {
  const {
    token,
    setToken,
    username,
    setUsername,
    userId,
    setUserId,
    userEmail,
    setUserEmail,
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchAuthDetails = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserEmail = await AsyncStorage.getItem('userEmail');

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUsername) {
        setUsername(storedUsername);
      }

      if (storedUserId) {
        setUserId(storedUserId);
      }

      if (storedUserEmail) {
        setUserEmail(storedUserEmail);
      }
    };

    if (!token || !username) {
      fetchAuthDetails();
    }
  }, [
    token,
    setToken,
    username,
    setUsername,
    userId,
    setUserId,
    userEmail,
    setUserEmail,
  ]);

  return {token, username, userId, userEmail};
};

export default useAuthToken;
