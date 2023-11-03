import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';
import {Linking} from 'react-native';

const config: AuthConfiguration = {
  clientId: Config.SPOTIFY_CLIENT_ID!,
  redirectUrl: 'com.ripple:/oauth',
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'http://192.168.0.215:3000/auth/spotify/token',
  },
  skipCodeExchange: true,
};

const handleSpotifyLogin = async () => {
  try {
    const result = await authorize(config);

    // 서버에 인증 코드와 codeVerifier를 전달
    const response = await fetch(
      'http://192.168.0.215:3000/auth/spotify/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: result.authorizationCode,
          codeVerifier: result.codeVerifier,
        }),
      },
    );

    const data = await response.json();
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export default handleSpotifyLogin;
