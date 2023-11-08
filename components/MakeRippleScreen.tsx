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
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
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
        console.error(error);
      }
    };
    fetchTags();
  }, []);

  const toggleTag = (tagName: any) => {
    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tagName)) {
        return prevSelectedTags.filter(tag => tag !== tagName); // 태그 해제
      } else {
        return [...prevSelectedTags, tagName]; // 태그 선택
      }
    });
  };

  const getTagStyle = (tagName: any) => {
    const isSelected = selectedTags.includes(tagName);
    return {
      backgroundColor: isSelected ? 'black' : 'grey',
      color: isSelected ? 'white' : 'black',
      // ... 기타 스타일 속성
    };
  };

  const getTagTextStyle = (tagName: string) => {
    const isSelected = selectedTags.includes(tagName);
    return {
      color: isSelected ? 'white' : 'black',
      // 여기에 다른 텍스트 스타일 속성을 추가할 수 있습니다.
    };
  };

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
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <TouchableWithoutFeedback onPress={() => toggleTag(tag.name)}>
              <View style={[styles.tag, getTagStyle(tag.name)]}>
                <Text style={[styles.tagText, getTagTextStyle(tag.name)]}>
                  {tag.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
          {/* '더 보기' 버튼 */}
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              // '더 보기' 버튼 로직 추가 필요
            }}>
            <Text style={styles.moreButtonText}>더 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default MakeRippleScreen;
