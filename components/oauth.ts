const handleSpotifyLogin = async () => {
  try {
    // NestJS 서버의 '/auth/spotify' 엔드포인트로 요청 보냄.
    const response = await fetch('http://192.168.0.215:3000/auth/spotify');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
