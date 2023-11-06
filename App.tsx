// React & React Native
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Libraries
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Components
import HomeScreen from './components/HomeScreen';
// import LibraryScreen from './components/LibraryScreen';
// import ProfileScreen from './components/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 로그인 후 보여질 하단 탭 네비게이터
function MainTabNavigator() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Library" component={LibraryScreen} /> */}
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 로그인 스크린 등 초기 스크린을 여기에 배치합니다 */}
        {/* 로그인 이후에 메인 탭으로 이동 */}
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
