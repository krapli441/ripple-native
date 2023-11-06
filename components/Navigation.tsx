import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from '../styles/NavigationStyles';

const NavigationTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return <View style={styles.tabContainer}>
    
  </View>;
};

export default NavigationTabBar;
