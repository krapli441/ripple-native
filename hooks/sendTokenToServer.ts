import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendTokenToServer = async (token: string) => {
  const userID: string | null = await AsyncStorage.getItem('userToken');

  if (!userID) {
    console.error('User ID is not available');
    return;
  }

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userID}`,
    },
    body: JSON.stringify({pushToken: token}),
  };

  try {
    console.log('Sending request with:', requestOptions);
    const response: Response = await fetch(
      'http://192.168.0.215:3000/auth/spotify/push-token',
      requestOptions,
    );

    if (!response.ok) {
      console.error(
        `Response Error: ${response.status} ${response.statusText}`,
      );
      const errorBody: string = await response.text();
      console.error(`Error Body: ${errorBody}`);
      throw new Error('Failed to send token to server');
    }

    const responseData = await response.json();
    console.log('Response from server:', responseData);
  } catch (error) {
    console.error('Error sending token to server:', error);
  }
};
