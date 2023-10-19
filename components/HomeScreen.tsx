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
} from 'react-native';

function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centerContent}>
          <Image
            source={require('../assets/img/ripplelogo.png')}
            style={styles.logo}
          />
          <Text style={styles.sectionTitle}>
            Hello Ripple. Let's make some shit.
          </Text>
          <TouchableOpacity style={[styles.button, styles.googleButton]}>
            <Text style={styles.buttonText}>Google을 이용하여 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.spotifyButton]}>
            <Text style={styles.buttonText}>Spotify를 이용하여 로그인</Text>
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
    padding: 15,
    borderRadius: 5,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});

export default HomeScreen;
