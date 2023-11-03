import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';

const handleSpotifyLogin = async () => {
  try {
    // NestJS 서버로 로그인 요청을 보냄
    const response = await fetch('http://192.168.0.215:3000/auth/spotify');
    const data = await response.json();

    // 필요한 경우, 응답으로 받은 데이터를 처리

    // 로그인이 성공하면 메인 페이지로 이동하거나 다른 로직을 실행
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export default handleSpotifyLogin;
