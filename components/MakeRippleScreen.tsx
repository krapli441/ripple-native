// react & react-native
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
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
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {useLocation} from '../utils/LocationContext';
import useAuthToken from '../utils/useAuthToken';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/MakeRippleScreenStyles';
import MapStyle from '../maps/customMapStyle.json';

interface Tag {
  name: string;
}

const mapViewProps = {
  customMapStyle: MapStyle,
  scrollEnabled: false,
  zoomEnabled: false,
  rotateEnabled: false,
  minZoomLevel: 18,
  maxZoomLevel: 20,
  showsScale: false,
  pitchEnabled: false,
  cacheEnabled: true,
  loadingEnabled: true,
};

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
      const response = await fetch(
        'http://192.168.0.215:3000/ripples',
        rippleData,
      );

      if (response.status === 201) {
        console.log('Ripple 생성', response);
      } else {
        // 다른 응답 처리 (에러 메세지 표시 등)
      }
    } catch (error) {
      console.log('Ripple 생성 에러 :', error);
    }
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
                source={require('../assets/img/ripple_sonar.gif')}
                style={{width: 30, height: 30}}
              />
            </Marker>
          )}
        </MapView>
        <Text style={styles.rippleHelpText}>이 위치에 음악이 남겨집니다.</Text>
        <TouchableOpacity
          style={styles.completeButton} // 스타일은 styles 객체에 정의해야 합니다.
          onPress={() => {
            const rippleData = {
              title: track?.title,
              artist: track?.artist,
              albumCoverUrl: track?.imageUrl,
              spotifyExternalUrl: track?.externalUrl,
              location: location,
              tag: tags,
              likes: 0,
            };
            console.log('Ripple 데이터', rippleData);
            createRipple(rippleData);
          }}>
          <Text style={styles.completeButtonText}>음악 남기기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default MakeRippleScreen;
