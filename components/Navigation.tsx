import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from '../styles/NavigationStyles';

type RootStackParamList = {
  Home: undefined;
  Ripple: undefined;
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const NavigationTabBar = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={25} />
        <Text style={styles.textStyle}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Ripple')}>
        <Icon name="map" size={25} />
        <Text style={styles.textStyle}>지도</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Icon name="user" size={25} />
        <Text style={styles.textStyle}>내 정보</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationTabBar;
