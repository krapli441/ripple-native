import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const handleSpotifyLogin = async (
  navigation: any,
  setIsAuthenticated: (value: boolean) => void,
) => {
  try {
    console.log('handleSpotifyLogin called');
    const result = await authorize(config);
    console.log('authorize result:', result);

    // refreshToken이 있는지 확인
    if (result.refreshToken) {
      console.log('Refresh Token:', result.refreshToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
    }

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

    console.log('Request sent:', {
      code: result.authorizationCode,
      codeVerifier: result.codeVerifier,
    });

    const data = await response.json();
    console.log('응답 값 :', data);
    console.log('유저네임 :', data.user.username);

    // JWT 토큰이 제대로 응답되었는지 확인
    if (data.jwtToken) {
      await AsyncStorage.setItem('userToken', data.jwtToken);
      await AsyncStorage.setItem('username', data.user.username);
      await AsyncStorage.setItem('userId', data.user._id);
      await AsyncStorage.setItem('userEmail', data.user.email);
      setIsAuthenticated(true);
      navigation.navigate('Ripple');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export default handleSpotifyLogin;
