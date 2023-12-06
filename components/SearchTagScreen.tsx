// react & react-native
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/SearchTagScrenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Tag {
  name: string;
}

function SearchTagScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const route = useRoute<RouteProp<RootStackParamList, 'SearchTagScreen'>>();
  const currentTrack = route.params?.currentTrack; // 넘겨받은 트랙 정보를 상태로 저장
  const [selectedTrack, setSelectedTrack] = useState(currentTrack);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('https://ripple.testpilotapp.com/tags/all');
        if (!response.ok) {
          throw new Error('Server error');
        }
        const data: Tag[] = await response.json();
        setTags(data); // 응답으로 받은 데이터를 상태에 저장
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);

  const getTagStyle = (tagName: any) => {
    const isSelected = selectedTags.includes(tagName);
    return {
      backgroundColor: isSelected ? 'black' : 'grey',
      color: isSelected ? 'white' : 'black',
    };
  };

  const getTagTextStyle = (tagName: string) => {
    const isSelected = selectedTags.includes(tagName);
    return {
      color: isSelected ? 'white' : 'black',
    };
  };

  // 화면 포커스 시 실행될 이펙트
  useFocusEffect(
    React.useCallback(() => {
      // 검색 상태 초기화
      setSearchTerm('');
      setSearchResults([]);
      // ...
    }, []),
  );

  const filteredTags = searchTerm
    ? tags.filter(tag => tag.name.includes(searchTerm))
    : tags;

  const toggleTag = (tagName: string) => {
    setSelectedTags(prevSelectedTags => {
      const isAlreadySelected = prevSelectedTags.includes(tagName);

      if (isAlreadySelected) {
        return prevSelectedTags.filter(tag => tag !== tagName);
      }

      if (prevSelectedTags.length < 5) {
        return [...prevSelectedTags, tagName];
      }

      return prevSelectedTags;
    });
  };

  const handleComplete = () => {
    navigation.navigate('MakeRippleScreen', {
      selectedTags: selectedTags,
      track: currentTrack,
    });
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

  return (
    <View style={styles.flexContainer}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.searchContainer}>
          <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
          <Text style={styles.header}>이럴 때 듣기 좋아요</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="태그 검색"
            onChangeText={handleSearchTermChange}
            value={searchTerm}
            returnKeyType="search"
            placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'}
          />
          <Text style={styles.headerHelpText}>
            태그는 5개까지 지정할 수 있어요.
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView
        style={styles.tagsContainer}
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {filteredTags.map(tag => (
          <TouchableWithoutFeedback
            onPress={() => toggleTag(tag.name)}
            key={tag.name}>
            <View style={[styles.tag, getTagStyle(tag.name)]}>
              <Text style={[styles.tagText, getTagTextStyle(tag.name)]}>
                {tag.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity
          onPress={handleComplete}
          style={styles.completeButton}>
          <Text style={styles.completeButtonText}>완료</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default SearchTagScreen;
