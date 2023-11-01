import {Linking} from 'react-native';

const handleSpotifyLogin = async () => {
  try {
    const response = await fetch('http://192.168.0.215:3000/auth/spotify-url');
    if (!response.ok) {
      console.log('Network response was not ok', response.status);
      return;
    }
    const data = await response.json();
    const authUrl = data.authUrl;
    console.log(authUrl);

    // 이제 authUrl을 웹 뷰로 열어 사용자가 로그인할 수 있게 한다.
    Linking.openURL(authUrl);
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
