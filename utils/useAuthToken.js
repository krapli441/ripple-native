import {useContext} from 'react';
import {AuthContext} from './AuthContext'; // 앱의 전역 상태를 관리

const useAuthToken = () => {
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setToken(token); // 전역 상태에 토큰 저장
      }
    };

    if (!token) {
      fetchToken(); // 토큰이 없을 때만 검색
    }
  }, [token, setToken]);

  return token;
};

export default useAuthToken;
