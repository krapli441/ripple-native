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
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {useLocation} from '../utils/LocationContext';
import useAuthToken from '../utils/useAuthToken';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/MakeRippleScreenStyles';
import MapStyle from '../maps/customMapStyle.json';

import {mapViewProps} from '../maps/MakeRippleScreen-mapViewProps';

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
  const {location} = useLocation();
  const authToken = useAuthToken();

  const getTagStyle = (tagName: string) => {
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

  useEffect(() => {
    if (incomingSelectedTags && incomingSelectedTags !== selectedTags) {
      setSelectedTags(incomingSelectedTags);
    }
  }, [incomingSelectedTags, selectedTags]);

  useEffect(() => {
    const fetchRandomTags = async () => {
      try {
        const response = await fetch('https://ripple.testpilotapp.com/tags/random');
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
          const response = await fetch('https://ripple.testpilotapp.com/tags/all');
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

  const toggleTag = (tagName: string) => {
    setSelectedTags(prevSelectedTags => {
      return prevSelectedTags.includes(tagName)
        ? prevSelectedTags.filter(tag => tag !== tagName)
        : [...prevSelectedTags, tagName];
    });
  };

  const goToSearchTagScreen = () => {
    navigation.navigate('SearchTagScreen', {
      currentTrack: track,
      selectedTags: selectedTags,
    });
  };

  const createRipple = async (rippleData: any) => {
    try {
      const response = await fetch('https://ripple.testpilotapp.com/ripples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rippleData),
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        navigation.navigate('RippleCreatedScreen', {rippleData});
        console.log('Ripple 생성 성공', responseBody);
      } else {
        console.log(
          'Ripple 생성 실패',
          response.status,
          response.statusText,
          responseBody,
        );
      }
    } catch (error) {
      console.log('Ripple 생성 에러 :', error);
    }
  };

  return (

      <ScrollView
        style={styles.searchContainer}
        contentContainerStyle={{flexGrow: 1}}>
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
        <Text style={styles.tagHelpText}>
          이 음악이 어울리는 순간을 추가해보세요.
        </Text>
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
          <Text style={styles.moreButtonText}>태그 편집</Text>
        </TouchableOpacity>
        <MapView
          {...mapViewProps}
          region={{
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={MapStyle}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}>
              <Image
                source={require('../assets/img/ripplemarker.png')}
                style={{width: 20, height: 20}}
              />
            </Marker>
          )}
        </MapView>
        <Text style={styles.rippleHelpText}>이 위치에 음악이 남겨집니다.</Text>
        <TouchableOpacity
          style={styles.completeButton} // 스타일은 styles 객체에 정의해야 합니다.
          onPress={() => {
            const rippleData = {
              userId: authToken.username,
              userObjectId: authToken.userId,
              title: track?.title,
              artist: track?.artist,
              albumCoverUrl: track?.imageUrl,
              spotifyExternalUrl: track?.externalUrl,
              location: {
                type: 'Point',
                coordinates: [location?.longitude, location?.latitude],
              },
              tag: tags.map(tag => tag.name),
              likes: 0,
              expiresAt: new Date(/* 만료 날짜 계산 */).toISOString(),
            };
            console.log('Ripple 데이터', rippleData);
            createRipple(rippleData);
          }}>
          <Text style={styles.completeButtonText}>음악 남기기</Text>
        </TouchableOpacity>
      </ScrollView>

  );
}

export default MakeRippleScreen;
