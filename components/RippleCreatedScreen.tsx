// react & react-native
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';

// google maps
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MapStyle from '../maps/customMapStyle.json';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/RippleCreatedScreenStyles';

const mapViewProps = {
  customMapStyle: MapStyle,
  mapPadding: {bottom: 0, top: 50, right: 0, left: 0},
  scrollEnabled: false,
  zoomEnabled: false,
  rotateEnabled: false,
  minZoomLevel: 17,
  maxZoomLevel: 20,
  showsScale: false,
  pitchEnabled: false,
  cacheEnabled: true,
  loadingEnabled: true,
};

function RippleCreatedScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'RippleCreatedScreen'>>();

  // rippleData를 route.params에서 가져옵니다.
  const {rippleData} = route.params;

  const markerRef = useRef<any>(null);

  const [region, setRegion] = useState({
    latitude: rippleData.location.coordinates[1], // 위도
    longitude: rippleData.location.coordinates[0], // 경도
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    // 말풍선을 표시하는 로직
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>음악이 남겨졌습니다</Text>
      <MapView
        {...mapViewProps}
        initialRegion={{
          latitude: rippleData.location.coordinates[1],
          longitude: rippleData.location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}>
        <Marker
          ref={markerRef}
          coordinate={{
            latitude: rippleData.location.coordinates[1],
            longitude: rippleData.location.coordinates[0],
          }}>
          <Image
            source={require('../assets/img/ripple_sonar.gif')}
            style={{width: 30, height: 30}}
          />
        </Marker>
      </MapView>
      {region.latitude === rippleData.location.coordinates[1] &&
        region.longitude === rippleData.location.coordinates[0] && (
          <View style={styles.customCallout}>
            <View style={styles.calloutRow}>
              <Image
                source={{uri: rippleData.albumCoverUrl}}
                style={styles.albumCover}
              />
              <View style={styles.calloutInfo}>
                <Text style={styles.calloutTitle} numberOfLines={1}>{rippleData.title}</Text>
                <Text style={styles.calloutArtist} numberOfLines={1}>{rippleData.artist}</Text>
              </View>
            </View>
            <View style={styles.tagContainer}>
              {rippleData.tag.map((tag, index) => (
                <Text key={index} style={styles.tagText}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        )}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => navigation.navigate('홈')}>
        <Text>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RippleCreatedScreen;
