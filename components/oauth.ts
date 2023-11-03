import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';
import {Linking} from 'react-native';

const config: AuthConfiguration = {
  clientId: Config.SPOTIFY_CLIENT_ID!,
  redirectUrl: 'http://192.168.0.215:3000/auth/spotify/',
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'http://192.168.0.215:3000/auth/spotify/token', // 여기를 NestJS 서버로 지정합니다.
  },
};

const handleSpotifyLogin = async () => {
  try {
    const result = await authorize(config);
    // 여기에서 result에는 인증 코드 정보가 포함되어 있다.
    // 이 정보를 서버에 전달하여 액세스 토큰을 받아와야 한다.
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export default handleSpotifyLogin;
