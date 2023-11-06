import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';


const config: AuthConfiguration = {
  clientId: Config.SPOTIFY_CLIENT_ID!,
  redirectUrl: 'com.ripple:/oauth',
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'http://172.30.1.27:3000/auth/spotify/token',
  },
  skipCodeExchange: true,
};

const handleSpotifyLogin = async (navigation: any) => {
  try {
    console.log('handleSpotifyLogin called');
    const result = await authorize(config);
    console.log('authorize result:', result);

    // 서버에 인증 코드와 codeVerifier를 전달
    const response = await fetch('http://172.30.1.27:3000/auth/spotify/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: result.authorizationCode,
        codeVerifier: result.codeVerifier,
      }),
    });

    const data = await response.json();
    console.log('응답 값 :', data);

    // JWT 토큰이 제대로 응답되었는지 확인
    if (data.jwtToken) {
      navigation.navigate('Ripple');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export default handleSpotifyLogin;
