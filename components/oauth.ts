import { authorize, AuthConfiguration } from 'react-native-app-auth';
import Config from 'react-native-config';

// React Native 클라이언트 코드
const handleSpotifyLogin = async () => {
  try {
    // NestJS 서버의 '/auth/spotify' 엔드포인트로 요청을 보냅니다.
    const response = await fetch('http://localhost:3000/auth/spotify');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
