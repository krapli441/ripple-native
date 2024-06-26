// React & React Native
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';

// Libraries
import Icon from 'react-native-vector-icons/FontAwesome';
import {HomeScreenNavigationProp} from '../types/navigationTypes';

// Components
import handleSpotifyLogin from './oauth';

// Style
import styles from '../styles/HomeScreenStyles';

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginButton: React.FC<{
  iconName: string;
  text: string;
  buttonStyle: any;
  onPress: () => void;
}> = ({iconName, text, buttonStyle, onPress}) => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <View style={styles.buttonContent}>
      <Icon name={iconName} size={20} color="black" />
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

// const TestButton: React.FC<{
//   iconName: string;
//   text: string;
//   buttonStyle: any;
//   onPress: () => void;
// }> = ({iconName, text, buttonStyle, onPress}) => (
//   <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
//     <View style={styles.buttonContent}>
//       <Icon name={iconName} size={20} color="black" />
//       <Text style={styles.buttonText}>{text}</Text>
//     </View>
//   </TouchableOpacity>
// );

function HomeScreen({
  navigation,
  setIsAuthenticated,
}: HomeScreenProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? '#191414' : '#191414',
  };

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEnabled={false}>
        <View style={styles.centerContent}>
          <Image
            source={require('../assets/img/ripplelogo.png')}
            style={styles.logo}
          />
          <LoginButton
            iconName="spotify"
            text="Spotify를 이용하여 로그인"
            buttonStyle={styles.spotifyButton}
            onPress={() => handleSpotifyLogin(navigation, setIsAuthenticated)}
          />
          {/* <TestButton
            iconName="spotify"
            text="테스트 - 튜토리얼 페이지 이동"
            buttonStyle={styles.googleButton}
            onPress={() => navigation.navigate('TutorialScreen')}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
