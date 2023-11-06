import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from '../styles/NavigationStyles';

// 아이콘 이름은 예시입니다. 실제 아이콘 이름과 일치해야 합니다.
const ICONS = {
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
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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

        const iconName = ICONS[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Icon name={iconName} size={20} color={isFocused ? 'tomato' : 'gray'} />
            <Text style={styles.tabLabel}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavigationTabBar;
