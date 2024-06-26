// react & react-native
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  useColorScheme,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/DeleteAccountScreenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

type DeleteAccountScreenProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteAccountScreen({
  setIsAuthenticated,
}: DeleteAccountScreenProps): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

  const handleDeleteAccount = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      console.log('Deleting account for user:', userId);
      console.log('users token : ', token);

      const response = await fetch(
        `https://ripple.testpilotapp.com/auth/spotify/delete/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
          },
        },
      );

      const responseData = await response.json(); // 서버의 응답을 JSON으로 변환
      console.log('Response from server:', responseData);

      if (response.ok) {
        await AsyncStorage.clear();
        setIsAuthenticated(false);
      } else {
        console.error('Failed to delete account:', responseData.message);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Image
        source={require('../assets/img/myRipple.png')}
        style={styles.myRippleImage}
      />
      <Text style={styles.header}>계정 삭제</Text>
      <Text style={styles.subHeader}>다음과 같은 정보들이 삭제됩니다.</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>내가 남긴 음악</Text>
        <Text style={styles.infoText}>좋아요 표시한 음악</Text>
        <Text style={styles.infoText}>Spotify 계정 정보 (닉네임, 이메일)</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxSize}>
          <CheckBox
            boxType="square"
            onCheckColor="#191414"
            onTintColor="#191414"
            disabled={false}
            animationDuration={0.2}
            onAnimationType="fade"
            offAnimationType="fade"
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
        </View>
        <Text style={styles.checkboxLabel}>해당 내용을 모두 확인했습니다.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={[
            styles.deleteButton,
            toggleCheckBox ? styles.buttonActive : styles.buttonInactive,
          ]}
          disabled={!toggleCheckBox}>
          <Text style={styles.buttonText}>계정 삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DeleteAccountScreen;
