import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from '../styles/NavigationStyles';

// 인덱스 서명을 추가
const ICONS: {[key: string]: string} = {
  Library: 'book',
  Home: 'home',
  Profile: 'user',
};

const NavigationTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = ICONS[route.name] || 'question'; // 기본 아이콘을 추가해 'undefined' 문제를 방지

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}>
            <Icon
              name={iconName}
              size={20}
              color={isFocused ? 'tomato' : 'gray'}
            />
            <Text style={styles.tabLabel}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavigationTabBar;
