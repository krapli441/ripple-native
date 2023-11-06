// React & React Native
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native';

// Style
import styles from '../styles/SearchScreenStyle';

const searchForMusic = async (searchQuery: string) => {
  try {
    // AsyncStorage에서 JWT 토큰을 가져옵니다.
    const jwtToken = await AsyncStorage.getItem('userToken');

    if (!jwtToken) {
      throw new Error('사용자 인증 토큰이 없습니다.');
    }

    // 백엔드 엔드포인트로 검색 요청을 보냅니다.
    const response = await fetch('http://YOUR_BACKEND_URL/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`, // JWT 토큰을 Authorization 헤더에 포함시킵니다.
      },
      body: JSON.stringify({query: searchQuery}),
    });

    const data = await response.json();

    if (response.ok) {
      // 검색 결과를 처리합니다.
      console.log('검색 결과:', data);
    } else {
      // 서버에서 에러 메시지를 받은 경우
      throw new Error(data.message || '검색을 완료할 수 없습니다.');
    }
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
  }
};

function SearchScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태를 추가

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
  };

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
          onChangeText={handleSearchTermChange}
          value={searchTerm}
          placeholderTextColor={isDarkMode ? 'grey' : 'darkgrey'}
        />
        <Button title="검색" onPress={() => null} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
