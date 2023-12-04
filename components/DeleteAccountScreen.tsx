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
// types
import {RootStackParamList} from '../types/navigationTypes';

// Style
import styles from '../styles/DeleteAccountScreenStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

function DeleteAccountScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      return () => {};
    }, []),
  );

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
      <Text>해당 내용을 모두 확인했습니다.</Text>

      <TouchableOpacity
        // onPress={handleDeleteAccount}
        style={[
          styles.deleteButton,
          toggleCheckBox ? styles.buttonActive : styles.buttonInactive,
        ]}
        disabled={!toggleCheckBox}>
        <Text style={styles.buttonText}>계정 삭제</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DeleteAccountScreen;
