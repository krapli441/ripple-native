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
  SafeAreaView,
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

  useFocusEffect(
    React.useCallback(() => {
      fetchMyRipples();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"#f8f9fa"}}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <Text style={styles.header}>내가 남긴 음악</Text>
        <ScrollView style={{marginBottom: 100}}>
          {myRipples.map(ripple => (
            <RippleItem key={ripple._id} ripple={ripple} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default MyRippleScreen;
