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
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// types
import {RootStackParamList} from '../types/navigationTypes';
import {TrackDetails} from '../types/navigationTypes';

// Style
import styles from '../styles/SearchTagScrenStyle';
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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://192.168.0.215:3000/tags/all');
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
      if (prevSelectedTags.includes(tagName)) {
        return prevSelectedTags.filter(tag => tag !== tagName);
      } else {
        return [...prevSelectedTags, tagName];
      }
    });
  };

  const handleComplete = () => {
    navigation.navigate('MakeRippleScreen', {
      track: currentTrack,
      selectedTags,
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
            placeholder="어울리는 태그를 검색해보세요"
            onChangeText={handleSearchTermChange}
            value={searchTerm}
            returnKeyType="search"
            placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'}
          />
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
