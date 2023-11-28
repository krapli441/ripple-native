// React & React Native
import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1DB954" />
      <Text style={styles.text}>불러오는 중...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191414',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'grey',
  },
});

export default LoadingScreen;
