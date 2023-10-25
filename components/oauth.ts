import {authorize} from 'react-native-app-auth';

const config = {
  clientId: 'a439c1481de445a3ad2018263b474525', // available on the app page
  clientSecret: 'aa169735fd6644538a032c2d11f650e5', // click "show client secret" to see this
  redirectUrl: 'com.ripple:/oauth', // the redirect you defined after creating the app
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const handleSpotifyLogin = async () => {
  console.log('handleSpotifyLogin is called'); // 이 로그가 출력되는지 확인
  try {
    const result = await authorize(config);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
