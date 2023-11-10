import {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './AuthContext'; // 앱의 전역 상태를 관리

const useAuthToken = () => {
  const {token, setToken, username, setUsername} = useContext(AuthContext);

  useEffect(() => {
    const fetchAuthDetails = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUsername = await AsyncStorage.getItem('username');

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    if (!token || !username) {
      fetchAuthDetails();
    }
  }, [token, setToken, username, setUsername]);

  return {token, username};
};

export default useAuthToken;
