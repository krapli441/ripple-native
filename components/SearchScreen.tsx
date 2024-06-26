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
  ActivityIndicator,
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
import styles from '../styles/SearchScreenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<TrackDetails[]>([]);
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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
    setIsSearchStarted(true);
    setIsSearching(true);
    try {
      let jwtToken = await AsyncStorage.getItem('userToken');
      const storedExpiryDate = await AsyncStorage.getItem('userTokenExpiry');
      const expiryDate = storedExpiryDate ? new Date(storedExpiryDate) : null;
      console.log('JWT 토큰 유효기간 : ', expiryDate);

      // JWT 토큰이 만료되었다면 새로운 토큰을 요청합니다.
      if (!jwtToken || !expiryDate || new Date() >= expiryDate) {
        console.log('토큰 만료 확인됨, 재발급 요청');
        const refreshToken = await AsyncStorage.getItem('userRefreshToken');
        const userId = await AsyncStorage.getItem('userId');

        if (!refreshToken || !userId) {
          throw new Error('Refresh token 또는 User ID가 없습니다.');
        }

        const refreshResponse = await fetch(
          'https://ripple.testpilotapp.com/auth/spotify/refresh-token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({refreshToken, userId}),
          },
        );

        const refreshData = await refreshResponse.json();
        console.log('리프레시 토큰을 이용해 응답받은 값 : ', refreshData);
        if (!refreshResponse.ok) {
          throw new Error('토큰 갱신 실패');
        }

        jwtToken = refreshData.jwtToken;
        await AsyncStorage.setItem('userToken', jwtToken!);
        await AsyncStorage.setItem('userTokenExpiry', new Date().toISOString()); // 새로운 만료 시간 설정
        await AsyncStorage.setItem(
          'userRefreshToken',
          refreshData.refreshToken,
        ); // 새로운 리프레시 토큰 저장
      }

      // 토큰을 사용하여 음악 검색을 진행합니다.
      const response = await fetch('https://ripple.testpilotapp.com/search', {
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
          imageUrl: item.album.images[0].url,
        }));
        setSearchResults(tracks);
        setIsSearching(false);
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
        <Image
          source={{uri: item.imageUrl}}
          defaultSource={require('../assets/img/albumCoverLoading.png')}
          style={styles.albumCover}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderEmptyComponent = () => {
    if (isSearching) {
      // 검색 중 로딩 인디케이터와 텍스트 표시
      return (
        <View style={styles.emptyResultContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      );
    } else if (!isSearchStarted) {
      // 검색을 시작하지 않은 경우 안내 문구 표시
      return (
        <View style={styles.emptyResultContainer}>
          <Text style={styles.emptyResultText}>
            아티스트, 제목명 등을 입력해보세요
          </Text>
        </View>
      );
    } else if (!isSearching && searchResults.length === 0) {
      // 검색 결과가 비어있고 검색이 완료된 경우
      return (
        <View style={styles.emptyResultContainer}>
          <Text style={styles.emptyResultText}>
            검색어에 해당되는 음악이 없습니다.
          </Text>
        </View>
      );
    }
    return null;
  };

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
        ListEmptyComponent={renderEmptyComponent}
      />
    </KeyboardAvoidingView>
  );
}

export default SearchScreen;
