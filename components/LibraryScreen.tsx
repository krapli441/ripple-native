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
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';

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
  const [likedRipples, setLikedRipples] = useState([]);
  const authToken = useAuthToken();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToMyRipples = () => {
    navigation.navigate('MyRippleScreen');
  };

  const navigateToLikedRipples = () => {
    navigation.navigate('LikedRippleScreen');
  };

  const fetchMyRipples = async () => {
    const userId = authToken.username;
    try {
      const response = await fetch(
        `https://ripple.testpilotapp.com/ripples/my-ripples/${userId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setMyRipples(data);
      } else {
        console.error('Failed to fetch my ripples');
      }
    } catch (error) {
      console.error('Error fetching my ripples:', error);
    }
  };

  const fetchLikedRipples = async () => {
    const userId = authToken.username;
    try {
      const response = await fetch(
        `https://ripple.testpilotapp.com/ripples/liked-ripples/${userId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setLikedRipples(data);
      } else {
        console.error('Failed to fetch liked ripples');
      }
    } catch (error) {
      console.error('Error fetching liked ripples:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {
        // 필요한 경우, 화면이 블러(blur) 될 때 다른 스타일로 되돌릴 수 있습니다
        // 예: StatusBar.setBarStyle('light-content');
      };
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchMyRipples();
      fetchLikedRipples();
    }, []),
  );

  return (
    <View style={styles.searchContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>라이브러리</Text>
      <MyRipple
        title="내가 남긴 음악"
        count={myRipples.length}
        imageSource={require('../assets/img/myRipple.png')}
        onPress={navigateToMyRipples}
      />
      <LikedRipple
        title="좋아요 표시한 음악"
        count={likedRipples.length}
        imageSource={require('../assets/img/myRipple.png')}
        onPress={navigateToLikedRipples}
      />
    </View>
  );
}

export default LibraryScreen;
