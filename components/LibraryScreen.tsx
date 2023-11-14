// react & react-native
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/LibraryScreenStyles';

const MyRipple = ({title, count, onPress, imageSource}: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={imageSource} style={styles.menuImage} />
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuCount}>{count}개</Text>
    </View>
  </TouchableOpacity>
);

const LikedRipple = ({title, count, onPress, imageSource}: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name="heart" size={35} color="#6ADE6C" style={styles.menuIcon} />
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuCount}>{count}개</Text>
    </View>
  </TouchableOpacity>
);

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
      <MyRipple
        title="내가 남긴 음악"
        count={myRipples.length}
        imageSource={require('../assets/img/myRipple.png')}
        // onPress={navigateToMyRipples}
      />
      <LikedRipple
        title="좋아요 표시한 음악"
        count={myRipples.length}
        imageSource={require('../assets/img/myRipple.png')}
      />
    </View>
  );
}

export default LibraryScreen;
