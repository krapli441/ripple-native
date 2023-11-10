// react & react-native
import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';

import MapView, {Marker} from 'react-native-maps';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/RippleCreatedScreen';

function RippleCreatedScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'RippleCreatedScreen'>>();

  // rippleData를 route.params에서 가져옵니다.
  const {rippleData} = route.params;

  return (
    <View style={styles.container}>
      <Text>음악이 남겨졌습니다</Text>
      <MapView
        initialRegion={{
          latitude: rippleData.location.latitude,
          longitude: rippleData.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <Marker
          coordinate={rippleData.location}
          title={rippleData.title}
          description={rippleData.artist}>
          {/* 마커에 추가할 말풍선 내용이 필요합니다 */}
        </Marker>
      </MapView>
      <TouchableOpacity onPress={() => navigation.navigate('Ripple')}>
        <Text>확인</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RippleCreatedScreen;
