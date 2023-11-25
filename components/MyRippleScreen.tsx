// react & react-native
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/MyRippleScreenStyles';

import {Ripple} from '../types/rippleTypes';

const RippleItem = ({ripple}: {ripple: Ripple}) => {
  // 날짜 형식 변환
  const formattedDate = new Date(ripple.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.rippleItem}>
      <Image source={{uri: ripple.albumCoverUrl}} style={styles.albumCover} />
      <View style={styles.rippleInfo}>
        <Text style={styles.rippleDate}>{formattedDate}</Text>
        <Text style={styles.rippleTitle} numberOfLines={1} ellipsizeMode="tail">
          {ripple.title}
        </Text>
        <Text style={styles.rippleArtist}>{ripple.artist}</Text>
      </View>
    </View>
  );
};

function MyRippleScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [myRipples, setMyRipples] = useState<Ripple[]>([]);
  const authToken = useAuthToken();

  const fetchMyRipples = async () => {
    const userId = authToken.username;
    try {
      const response = await fetch(
        `http://192.168.104.251:3000/ripples/my-ripples/${userId}`,
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

  useFocusEffect(
    React.useCallback(() => {
      fetchMyRipples();
    }, []),
  );

  return (
    <View style={styles.searchContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Text style={styles.header}>내가 남긴 음악</Text>
      <ScrollView>
        {myRipples.map(ripple => (
          <RippleItem key={ripple._id} ripple={ripple} />
        ))}
      </ScrollView>
    </View>
  );
}

export default MyRippleScreen;
