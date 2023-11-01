const handleSpotifyLogin = async () => {
  try {
    // NestJS 서버의 '/auth/spotify' 엔드포인트로 요청을 보냄
    const response = await fetch('http://192.168.0.215:3000/auth/spotify');
    if (!response.ok) {
      console.log('Network response was not ok', response.status);
      return;
    }

    // 이 부분에서 웹 브라우저나 웹 뷰를 열어서 사용자가 인증할 수 있도록 처리
    // 예: Linking.openURL(response.url);
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
