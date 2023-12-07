// react & react-native
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

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

function LikedRippleScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [likedRipples, setLikedRipples] = useState<Ripple[]>([]);
  const authToken = useAuthToken();

  const fetchLikedRipples = async () => {
    const userId = authToken.username;
    if (!userId) return;

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
      fetchLikedRipples();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fa'}}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <Text style={styles.header}>좋아요 표시한 음악</Text>
        <ScrollView style={{marginBottom: 100}}>
          {likedRipples.length > 0 ? (
            likedRipples.map(ripple => (
              <RippleItem key={ripple._id} ripple={ripple} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                아직 좋아요 표시한 음악이 없습니다.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default LikedRippleScreen;
