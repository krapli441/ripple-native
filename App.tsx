// React & React Native
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Libraries
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import SearchScreen from './components/SearchScreen';
import NavigationTabBar from './components/Navigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Ripple"
          component={MapScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
