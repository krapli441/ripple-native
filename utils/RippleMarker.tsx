import React from 'react';
import {Marker, Callout, CalloutSubview} from 'react-native-maps';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/MapScreenStyles'; // 스타일 파일 경로는 변경할 수 있습니다.

// Ripple 객체와 관련 함수의 타입을 정의합니다.
interface Ripple {
  _id: string;
  userId: string;
  location: {
    coordinates: [number, number];
  };
  spotifyExternalUrl: string;
  albumCoverUrl: string;
  title: string;
  artist: string;
  likedUsers: string[];
  tag: string[];
}

interface RippleMarkerProps {
  ripple: Ripple;
  handleLike: (rippleId: string, userId: string) => void;
  handleSpotifyPlay: (spotifyUrl: string) => void;
  authToken: {username?: string};
}

const RippleMarker: React.FC<RippleMarkerProps> = ({
  ripple,
  handleLike,
  handleSpotifyPlay,
  authToken,
}) => {
  return (
    <Marker
      key={ripple._id}
      coordinate={{
        latitude: ripple.location.coordinates[1],
        longitude: ripple.location.coordinates[0],
      }}>
      <Image
        source={require('../assets/img/otherUserMarker.png')}
        style={{width: 30, height: 30}}
      />
      <Callout tooltip={true} style={styles.calloutStyle}>
        <Text style={styles.userInfo}>{ripple.userId}</Text>
        <View style={styles.secondRow}>
          <Image
            source={{uri: ripple.albumCoverUrl}}
            style={styles.albumCover}
          />
          <View style={styles.trackInfo}>
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {ripple.title}
            </Text>
            <Text
              style={styles.artistText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {ripple.artist}
            </Text>
            <View style={styles.tagContainer}>
              {ripple.tag.map((tag, idx) => (
                <Text style={styles.tagText} key={idx}>
                  #{tag}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.thirdRow}>
          <CalloutSubview
            onPress={() => handleSpotifyPlay(ripple.spotifyExternalUrl)}
            style={styles.calloutSpotifyButton}>
            <TouchableOpacity style={styles.buttonLayout}>
              <Icon name="spotify" size={20} color="black" />
              <Text style={styles.calloutButtonText}>Spotify에서 재생</Text>
            </TouchableOpacity>
          </CalloutSubview>
          <CalloutSubview
            onPress={() => {
              if (authToken.username) {
                handleLike(ripple._id, authToken.username);
              }
            }}
            style={styles.calloutLikeButton}>
            <TouchableOpacity style={styles.buttonLayout}>
              <Icon
                name={
                  ripple.likedUsers.includes(authToken.username ?? '')
                    ? 'check'
                    : 'heart'
                }
                size={20}
                color="white"
              />
              <Text style={styles.calloutLikeButtonText}>좋아요</Text>
            </TouchableOpacity>
          </CalloutSubview>
        </View>
      </Callout>
    </Marker>
  );
};

export default RippleMarker;
