// react & react-native
import React, {useEffect, useState} from 'react';
import {View, StatusBar, Text, useColorScheme} from 'react-native';

import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/LibraryScreenStyles';

function LibraryScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [myRipples, setMyRipples] = useState([]);
  const authToken = useAuthToken();

  useEffect(() => {
    async function fetchMyRipples() {
      const userId = authToken.username;
      try {
        const response = await fetch(
          `http://192.168.0.215:3000/ripples/my-ripples/${userId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setMyRipples(data);
          console.log('내가 남긴 음악 : ', data);
        } else {
          // 오류 처리
          console.error('Failed to fetch my ripples');
        }
      } catch (error) {
        console.error('Error fetching my ripples:', error);
      }
    }

    fetchMyRipples();
  }, []);

  return (
    <View style={styles.searchContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Text style={styles.header}>라이브러리</Text>
    </View>
  );
}

export default LibraryScreen;
