// react & react-native
import React, {useState} from 'react';
import {View, StatusBar, Text, useColorScheme} from 'react-native';

// Style
import styles from '../styles/LibraryScreenStyles';

function LibraryScreen(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.searchContainer}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Text style={styles.header}>라이브러리</Text>
    </View>
  );
}

export default LibraryScreen;
