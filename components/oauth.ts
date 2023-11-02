import {authorize, AuthConfiguration} from 'react-native-app-auth';
import Config from 'react-native-config';

const handleSpotifyLogin = async (navigation: any) => {
  try {
    const response = await fetch('http://192.168.0.215:3000/auth/spotify-url');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('요청 응답 값 :', data);
    const authUrl = data.authUrl;
    console.log('로그인 주소 :', authUrl);

    const result = await authorize({
      clientId: Config.SPOTIFY_CLIENT_ID!,
      serviceConfiguration: {
        authorizationEndpoint: authUrl,
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
      redirectUrl: 'com.ripple:/oauth',
      scopes: [
        'user-read-email',
        'playlist-modify-public',
        'user-read-private',
      ],
    });

    console.log(result);

    // Access Token을 NestJS 서버에 전송
    const tokenResponse = await fetch(
      'http://192.168.0.215:3000/auth/validate-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: result.accessToken,
        }),
      },
    );

    const tokenData = await tokenResponse.json();
    if (tokenData.success) {
      console.log('Token validation successful.');
      // 로그인이 성공하면 MapScreen으로 이동
      navigation.navigate('Ripple');
    } else {
      console.error('Token validation failed:', tokenData.error);
    }
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
