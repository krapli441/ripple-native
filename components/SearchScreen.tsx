import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  Button,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native';

// Style
import styles from '../styles/SearchScreenStyle';

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchForMusic = async (searchQuery: string) => {
    try {
      // AsyncStorage에서 JWT 토큰을 가져옴
      const jwtToken = await AsyncStorage.getItem('userToken');

      if (!jwtToken) {
        throw new Error('사용자 인증 토큰이 없습니다.');
      }

      // 백엔드 엔드포인트로 검색 요청을 보낸다.
      const response = await fetch('http://172.30.1.27:3000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({query: searchQuery}),
      });

      const data = await response.json();

      if (response.ok) {
        const tracks = data.map((item: any) => ({
          title: item.name,
          artist: item.artists.map((artist: any) => artist.name).join(', '),
          externalUrl: item.external_urls.spotify,
          imageUrl: item.album.images[0].url, // 가장 큰 이미지를 선택합니다.
        }));
        setSearchResults(tracks);
      } else {
        throw new Error(data.message || '검색을 완료할 수 없습니다.');
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  const handleSearchMusic = () => {
    searchForMusic(searchTerm);
  };

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
  };

  // 키보드를 숨기는 함수
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  const renderItem = ({item}: any) => (
    <View style={styles.resultItem}>
      <Image source={{uri: item.imageUrl}} style={styles.albumCover} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(item.externalUrl)}>
        <Text style={styles.link}>Play</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
        <Text style={styles.header}>음악 검색</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="음악을 검색해주세요"
          onChangeText={handleSearchTermChange}
          value={searchTerm}
          placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'}
        />
        <Button title="검색" onPress={handleSearchMusic} />
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => `result-${index}`}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
