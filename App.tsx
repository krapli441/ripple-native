// React & React Native
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Libraries
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

// Components
import HomeScreen from './components/HomeScreen';
import NavigationTabBar from './components/Navigation';
import MapScreen from './components/MapScreen';
import SearchScreen from './components/SearchScreen';
import MakerippleScreen from './components/MakeRippleScreen';
import SearchTagScreen from './components/SearchTagScreen';
import RippleCreatedScreen from './components/RippleCreatedScreen';
import LibraryScreen from './components/LibraryScreen';
import MyRippleScreen from './components/MyRippleScreen';
import LikedRippleScreen from './components/LikedRippleScreen';
import NotificationScreen from './components/NotificationScreen';
import MyPageScreen from './components/MyPageScreen';
import MyPageScreenAccount from './components/MyPageScreen-Account';
import MyPageScreenSetting from './components/MyPageScreen-Setting';
import MyPageScreenCustomerService from './components/MyPageScreen-CustomerService';
import MyPageScreenInformation from './components/MyPageScreen-Information';

// AuthProvider
import AuthProvider from './utils/AuthContext';
import {LocationProvider} from './utils/LocationContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const MyPageStack = createStackNavigator();

function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen
        name="MyRippleScreenAccount"
        component={MyPageScreenAccount}
      />
      <MyPageStack.Screen
        name="MyRippleScreenInformation"
        component={MyPageScreenInformation}
      />
      <MyPageStack.Screen
        name="MyRippleScreenSetting"
        component={MyPageScreenSetting}
      />
      <MyPageStack.Screen
        name="MyRippleScreenCustomerService"
        component={MyPageScreenCustomerService}
      />
    </MyPageStack.Navigator>
  );
}

function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
      <LibraryStack.Screen name="MyRippleScreen" component={MyRippleScreen} />
      <LibraryStack.Screen
        name="LikedRippleScreen"
        component={LikedRippleScreen}
      />
    </LibraryStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      />
      <SearchStack.Screen
        name="MakeRippleScreen"
        component={MakerippleScreen}
        options={{
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
          gestureEnabled: false,
        }}
      />

      <SearchStack.Screen
        name="SearchTagScreen"
        component={SearchTagScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <SearchStack.Screen
        name="RippleCreatedScreen"
        component={RippleCreatedScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
        }}
      />
    </SearchStack.Navigator>
  );
}

// 로그인 후 보여질 하단 탭 네비게이터
function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <NavigationTabBar {...props} />}
      initialRouteName="홈">
      <Tab.Screen
        name="라이브러리"
        component={LibraryStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="홈"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={MyPageStackScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SearchModal"
        component={SearchStackScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <AuthProvider>
      <LocationProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Ripple"
              component={MainTabNavigator}
              options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
              name="SearchModal"
              component={SearchStackScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyRippleScreen"
              component={MyRippleScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LikedRippleScreen"
              component={LikedRippleScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
