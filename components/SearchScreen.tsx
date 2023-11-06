// React & React Native
import React from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

// Style
import styles from '../styles/SearchScreenStyle';

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  // 키보드를 숨기는 함수
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {
        // 여기도 마찬가지로 다른 스크린으로 이동할 때의 상태 표시줄 스타일을 복구하는 데 사용할 수 있습니다.
      };
    }, []),
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.searchContainer}>
        <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />
        <Text style={styles.header}>음악 남기기</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="음악을 검색해주세요"
          placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
