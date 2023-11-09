// react & react-native
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';
import {TrackDetails} from '../types/navigationTypes';

// asyncStorage
import useAuthToken from '../utils/useAuthToken';

// Style
import styles from '../styles/SearchScreenStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<TrackDetails[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const authToken = useAuthToken();

  useFocusEffect(
    React.useCallback(() => {
      setSearchTerm('');
      setSearchResults([]);

      StatusBar.setBarStyle('dark-content');

      // 화면이 blur 될 때 실행될 clean-up function
      return () => {};
    }, []),
  );

  const searchForMusic = async (searchQuery: string) => {
    try {
      const jwtToken = authToken;

      if (!jwtToken) {
        throw new Error('사용자 인증 토큰이 없습니다.');
      }

      const response = await fetch('http://192.168.0.215:3000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({query: searchQuery}),
      });

      const data = await response.json();
      console.log(data);

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
    if (searchTerm.trim()) {
      searchForMusic(searchTerm);
    } else {
      Alert.alert('검색 오류', '검색어를 입력해주세요.');
    }
  };

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
  };

  // 키보드를 숨기는 함수
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSelectTrack = (track: TrackDetails) => {
    navigation.navigate('MakeRippleScreen', {track});
  };
  const renderItem = ({item}: {item: TrackDetails}) => (
    <TouchableOpacity onPress={() => handleSelectTrack(item)}>
      <View style={styles.resultItem}>
        <Image source={{uri: item.imageUrl}} style={styles.albumCover} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flexContainer}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.searchContainer}>
          <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
          <Text style={styles.header}>음악 남기기</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="음악을 검색해주세요"
            onChangeText={handleSearchTermChange}
            value={searchTerm}
            returnKeyType="search"
            onSubmitEditing={handleSearchMusic}
            placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'}
          />
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        style={styles.flatListStyle}
        contentContainerStyle={styles.flatListContent}
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => `result-${index}`}
      />
    </KeyboardAvoidingView>
  );
}

export default SearchScreen;
