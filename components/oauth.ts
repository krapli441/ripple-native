import { authorize, AuthConfiguration } from 'react-native-app-auth';
import Config from 'react-native-config';

const handleSpotifyLogin = async (navigation: any) => {
  try {
    const authConfig: AuthConfiguration = {
      issuer: 'https://accounts.spotify.com',
      clientId: Config.SPOTIFY_CLIENT_ID!,
      clientSecret: Config.SPOTIFY_CLIENT_SECRET!,
      redirectUrl: 'com.ripple:/oauth',
      scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
    const result = await authorize(authConfig);
    console.log(result);

    // 로그인이 성공하면 MapScreen으로 이동
    navigation.navigate('Ripple');
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
