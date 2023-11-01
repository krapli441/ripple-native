const handleSpotifyLogin = async () => {
  try {
    const response = await fetch('http://192.168.0.215:3000/auth/spotify');

    if (!response.ok) {
      console.log('Network response was not ok', response.status);
      const text = await response.text();
      console.log('Server response:', text);
      return;
    }
    const data = await response.blob();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default handleSpotifyLogin;
