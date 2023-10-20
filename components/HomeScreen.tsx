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
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Ripple: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: HomeScreenProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centerContent}>
          <Image
            source={require('../assets/img/ripplelogo.png')}
            style={styles.logo}
          />
          <TouchableOpacity style={[styles.button, styles.googleButton]}>
            <View style={styles.buttonContent}>
              <Icon name="google" size={20} color="black" />
              <Text style={styles.buttonText}>Google을 이용하여 로그인</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.spotifyButton]}>
            <View style={styles.buttonContent}>
              <Icon name="spotify" size={20} color="black" />
              <Text style={styles.buttonText}>Spotify를 이용하여 로그인</Text>
            </View>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
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
    backgroundColor: '#FFFFFF',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
  },
  mapButton: {
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    marginLeft: 10,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
