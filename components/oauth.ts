import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';
import {Linking} from 'react-native';

const handleSpotifyLogin = async () => {
  try {
    // NestJS 서버로 로그인 요청을 보냄
    const response = await fetch('http://192.168.0.215:3000/auth/spotify');
    const data = await response.json();

    // 인증 URL로 사용자를 리다이렉트
    if (data.authorizeUrl) {
      Linking.openURL(data.authorizeUrl);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export default handleSpotifyLogin;
