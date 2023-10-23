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

// Others
import Icon from 'react-native-vector-icons/FontAwesome';
import {HomeScreenNavigationProp} from '../types/navigationTypes';

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const LoginButton: React.FC<{
  iconName: string;
  text: string;
  buttonStyle: any;
}> = ({iconName, text, buttonStyle}) => (
  <TouchableOpacity style={[styles.button, buttonStyle]}>
    <View style={styles.buttonContent}>
      <Icon name={iconName} size={20} color="black" />
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

function HomeScreen({navigation}: HomeScreenProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? '#191414' : 'white',
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
            iconName="google"
            text="Google을 이용하여 로그인"
            buttonStyle={styles.googleButton}
          />
          <LoginButton
            iconName="spotify"
            text="Spotify를 이용하여 로그인"
            buttonStyle={styles.spotifyButton}
          />
          <TouchableOpacity
            style={[styles.button, styles.mapButton]}
            onPress={() => navigation.navigate('Ripple')}>
            <View style={styles.buttonContent}>
              <Icon name="map" size={20} color="black" />
              <Text style={styles.buttonText}>테스트 - 지도로 이동</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 30,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#EDEDE9',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
  },
  mapButton: {
    backgroundColor: '#EDEDE9',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    marginLeft: 10,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 80,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
