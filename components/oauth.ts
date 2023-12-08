import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const config: AuthConfiguration = {
  clientId: Config.SPOTIFY_CLIENT_ID!,
  redirectUrl: 'com.ripple:/oauth',
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://ripple.testpilotapp.com/auth/spotify/token',
  },
  skipCodeExchange: true,
};

const handleSpotifyLogin = async (
  navigation: any,
  setIsAuthenticated: (value: boolean) => void,
) => {
  try {
    const result = await authorize(config);
    console.log('authorize result:', result);

    // refreshToken이 있는지 확인
    if (result.refreshToken) {
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
    }

    // 서버에 인증 코드와 codeVerifier를 전달
    const response = await fetch(
      'https://ripple.testpilotapp.com/auth/spotify/token',
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

    // JWT 토큰이 제대로 응답되었는지 확인
    if (data.jwtToken) {
      await AsyncStorage.setItem('userToken', data.jwtToken);
      await AsyncStorage.setItem('userTokenExpiry', data.user.tokenExpiry);
      await AsyncStorage.setItem('username', data.user.username);
      await AsyncStorage.setItem('userId', data.user._id);
      await AsyncStorage.setItem('userEmail', data.user.email);
      await AsyncStorage.setItem('userRefreshToken', data.user.refreshToken);
      setIsAuthenticated(true);

      console.log('튜토리얼 확인 여부 : ', data.user.tutorialReaded);
      // 튜토리얼을 이미 완료했는지 확인
      if (data.user.tutorialReaded) {
        setIsAuthenticated(true);
        // 튜토리얼을 이미 완료했다면 바로 메인 화면으로 이동
        // navigation.navigate('Ripple');
      } else {
        // 튜토리얼을 아직 완료하지 않았다면 튜토리얼 화면으로 이동
        navigation.navigate('TutorialScreen');
      }
    }
  } catch (error) {
    console.error('Error during login:', error);

    Alert.alert(
      '로그인 에러',
      '로그인 과정 중 에러가 발생했습니다. 다시 시도해주세요.',
      [{text: '확인', onPress: () => console.log('OK Pressed')}],
    );
  }
};

export default handleSpotifyLogin;
