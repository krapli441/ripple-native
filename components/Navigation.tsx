import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import styles from '../styles/NavigationStyles';

const ROUTES = {
  HOME: '홈',
  LIBRARY: '라이브러리',
  PROFILE: '내 정보',
  // ... 다른 라우트 이름들
};

const ICONS = {
  [ROUTES.LIBRARY]: 'bars',
  [ROUTES.HOME]: 'home',
  [ROUTES.PROFILE]: 'user',
  // ... 다른 아이콘 이름들
};

const NavigationTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const filteredRoutes = state.routes.filter(
    route => route.name !== 'SearchModal',
  );

  return (
    <View style={styles.tabContainer}>
      {filteredRoutes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;
        const label =
          typeof options.tabBarLabel === 'function'
            ? options.tabBarLabel({
                focused: isFocused,
                color: isFocused ? 'tomato' : 'gray',
                position: 'below-icon', // 여기에 기본값을 제공.
                children: route.name, // children에 대해서도 기본값을 제공.
              })
            : options.tabBarLabel || options.title || route.name;

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
              size={32}
              color={isFocused ? 'black' : 'gray'}
            />
            {typeof label === 'string' ? (
              // label이 문자열일 경우 Text 컴포넌트를 사용.
              <Text style={styles.tabLabel}>{label}</Text>
            ) : (
              // label이 함수로부터 반환된 React 요소일 경우 그대로 렌더링.
              label
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavigationTabBar;
