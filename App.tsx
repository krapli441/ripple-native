// React & React Native
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Libraries
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import HomeScreen from './components/HomeScreen';
import NavigationTabBar from './components/Navigation';
import MapScreen from './components/MapScreen';
import SearchScreen from './components/SearchScreen';
// import LibraryScreen from './components/LibraryScreen';
// import ProfileScreen from './components/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 로그인 후 보여질 하단 탭 네비게이터
function MainTabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <NavigationTabBar {...props} />}>
      {/* <Tab.Screen name="Library" component={LibraryScreen} /> */}
      <Tab.Screen
        name="홈"
        component={MapScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Library"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 로그인 스크린을 여기에 배치 */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        {/* 로그인 이후에 메인 탭으로 이동 */}
        <Stack.Screen
          name="Ripple"
          component={MainTabNavigator}
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
