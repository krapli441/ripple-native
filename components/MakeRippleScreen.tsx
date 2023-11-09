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

interface Tag {
  name: string;
}

function MakeRippleScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const route = useRoute<RouteProp<RootStackParamList, 'MakeRippleScreen'>>();
  const track = route.params?.track;
  const incomingSelectedTags = route.params?.selectedTags;
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (incomingSelectedTags) {
      setSelectedTags(incomingSelectedTags);
    }
  }, [incomingSelectedTags]);

  useEffect(() => {
    const fetchRandomTags = async () => {
      try {
        const response = await fetch('http://192.168.0.215:3000/tags/random');
        if (!response.ok) {
          throw new Error('Server error');
        }
        const randomTags: Tag[] = await response.json();
        setTags(randomTags);
      } catch (error) {
        console.error(error);
      }
    };

    if (tags.length === 0) {
      fetchRandomTags();
    }
  }, []);

  useEffect(() => {
    if (route.params?.selectedTags) {
      const updateTagsWithSelected = async () => {
        try {
          const response = await fetch('http://192.168.0.215:3000/tags/all');
          if (!response.ok) {
            throw new Error('Server error');
          }
          const allTags: Tag[] = await response.json();
          const filteredTags = allTags.filter(tag =>
            route.params.selectedTags?.includes(tag.name),
          );
          setTags(filteredTags); // 선택된 태그로 태그 목록을 업데이트
        } catch (error) {
          console.error(error);
        }
      };

      updateTagsWithSelected();
    }
  }, [route.params?.selectedTags]);

  useEffect(() => {
    if (route.params?.selectedTags) {
      setSelectedTags(route.params.selectedTags);
    }
  }, [route.params?.selectedTags]);

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
    };
  };

  const getTagTextStyle = (tagName: string) => {
    const isSelected = selectedTags.includes(tagName);
    return {
      color: isSelected ? 'white' : 'black',
    };
  };

  const goToSearchTagScreen = () => {
    navigation.navigate('SearchTagScreen', {
      currentTrack: track,
      selectedTags: selectedTags,
    });
  };

  useEffect(() => {
    if (route.params?.selectedTags) {
      setSelectedTags(route.params.selectedTags);
    }
  }, [route.params?.selectedTags, route.params?.track]);

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
          {tags.slice(0, 8).map((tag, index) => (
            <TouchableWithoutFeedback
              key={tag.name}
              onPress={() => toggleTag(tag.name)}>
              <View style={[styles.tag, getTagStyle(tag.name)]}>
                <Text style={[styles.tagText, getTagTextStyle(tag.name)]}>
                  {tag.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={goToSearchTagScreen}>
          <Text style={styles.moreButtonText}>더 보기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default MakeRippleScreen;
