import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Define your screen names and their respective params
type RootStackParamList = {
  Home: undefined;
  Ripple: undefined;
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CustomTabBar = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={20} />
        <Text>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Ripple')}>
        <Icon name="map" size={20} />
        <Text>지도</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Icon name="user" size={20} />
        <Text>내 정보</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 120,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute', // <-- Add this line
    bottom: 0, // <-- Add this line
    left: 0, // <-- Add this line
    right: 0, // <-- Add this line
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
  },
});

export default CustomTabBar;
