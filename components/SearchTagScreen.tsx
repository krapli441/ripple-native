// react & react-native
import React, {useState, useLayoutEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Style
import styles from '../styles/SearchScreenStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SearchTagScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 화면 포커스 시 실행될 이펙트
  useFocusEffect(
    React.useCallback(() => {
      // 검색 상태 초기화
      setSearchTerm('');
      setSearchResults([]);
      // ...
    }, []),
  );

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

  const goToSearchTagScreen = () => {
    navigation.navigate('SearchTagScreen');
  };

  // const handleSelectTrack = (track: TrackDetails) => {
  //   navigation.navigate('MakeRippleScreen', {track});
  // };

  // const renderItem = ({item}: any) => (
  //   <TouchableOpacity onPress={() => handleSelectTrack(item)}>
  //     <View style={styles.resultItem}>
  //       <Image source={{uri: item.imageUrl}} style={styles.albumCover} />
  //       <View style={styles.infoContainer}>
  //         <Text style={styles.title}>{item.title}</Text>
  //         <Text style={styles.artist}>{item.artist}</Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flexContainer}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.searchContainer}>
          <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
          <Text style={styles.header}>이럴 때 듣기 좋아요</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="어울리는 태그를 검색해보세요"
            onChangeText={handleSearchTermChange}
            value={searchTerm}
            returnKeyType="search"
            // onSubmitEditing={}
            placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SearchTagScreen;
