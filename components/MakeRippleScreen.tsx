// react & react-native
import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/MakeRippleScreenStyles';

function MakeRippleScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const route = useRoute<RouteProp<RootStackParamList, 'MakeRippleScreen'>>();
  const track = route.params?.track;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // API 엔드포인트를 호출
    const fetchTags = async () => {
      try {
        const response = await fetch('http://192.168.0.215:3000/tags/random');
        if (!response.ok) {
          throw new Error('Server error');
        }
        const data = await response.json();
        setTags(data); // 응답으로 받은 데이터를 상태에 저장
        console.log(data);
      } catch (error) {
        console.error(error); // 에러 출력
      }
    };
    fetchTags(); // 함수를 호출합니다.
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때만 함수를 호출하도록 합니다.

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <Text style={styles.header}>음악 남기기</Text>
        {track && (
          <View style={styles.resultItem}>
            <Image source={{uri: track.imageUrl}} style={styles.albumCover} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{track.title}</Text>
              <Text style={styles.artist}>{track.artist}</Text>
            </View>
          </View>
        )}
        <Text style={styles.tagHeader}>이럴 때 듣기 좋아요</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default MakeRippleScreen;
