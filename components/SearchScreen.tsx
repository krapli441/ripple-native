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
// Style
import styles from '../styles/SearchScreenStyle';

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  // 키보드를 숨기는 함수
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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
