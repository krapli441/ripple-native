// React & React Native
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Libraries
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import DeleteAccountScreen from './components/DeleteAccountScreen';
import LoadingScreen from './components/LodingScreen';
import TutorialScreenOne from './components/TutorialScreen-1';
import TutorialScreenTwo from './components/TutorialScreen-2';

// AuthProvider
import AuthProvider from './utils/AuthContext';
import {LocationProvider} from './utils/LocationContext';
import TutorialScreenThree from './components/TutorialScreen-3';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const MyPageStack = createStackNavigator();
const TutorialStack = createStackNavigator();

type MainTabNavigatorProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

type MyPageStackScreenProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

type TutorialStackScreenProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorialCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

function TutorialStackScreen({
  setIsAuthenticated,
  setTutorialCompleted,
}: TutorialStackScreenProps) {
  return (
    <TutorialStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TutorialStack.Screen name="Tutorial" component={TutorialScreenOne} />
      <TutorialStack.Screen
        name="TutorialScreenTwo"
        component={TutorialScreenTwo}
      />
      <TutorialStack.Screen
        name="TutorialScreenThree"
        options={{headerShown: false}}>
        {props => (
          <TutorialScreenThree
            {...props}
            setIsAuthenticated={setIsAuthenticated}
            setTutorialCompleted={setTutorialCompleted}
          />
        )}
      </TutorialStack.Screen>
    </TutorialStack.Navigator>
  );
}

function MyPageStackScreen({setIsAuthenticated}: MyPageStackScreenProps) {
  return (
    <MyPageStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen name="MyRippleScreenAccount">
        {props => (
          <MyPageScreenAccount
            {...props}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </MyPageStack.Screen>
      <MyPageStack.Screen name="DeleteAccountScreen">
        {props => (
          <DeleteAccountScreen
            {...props}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </MyPageStack.Screen>
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
function MainTabNavigator({setIsAuthenticated}: MainTabNavigatorProps) {
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
        children={() => (
          <MyPageStackScreen setIsAuthenticated={setIsAuthenticated} />
        )}
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 초기 로딩 상태를 false로 설정

  useEffect(() => {
    const checkTutorialCompletion = async () => {
      const tutorialDone = await AsyncStorage.getItem('tutorialCompleted');
      setTutorialCompleted(tutorialDone === 'true');
    };

    if (isAuthenticated) {
      checkTutorialCompletion();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true); // 인증 확인 시작 시 로딩 시작
      const token = await AsyncStorage.getItem('userToken');
      const tutorialDone = await AsyncStorage.getItem('tutorialCompleted');
      setIsAuthenticated(!!token);
      setTutorialCompleted(tutorialDone === 'true');
      setIsLoading(false); // 로딩 완료
    };

    // 앱이 마운트될 때 한 번만 인증 상태 확인
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <LocationProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isAuthenticated ? (
              tutorialCompleted ? (
                <Stack.Screen
                  name="Ripple"
                  children={() => (
                    <MainTabNavigator setIsAuthenticated={setIsAuthenticated} />
                  )}
                  options={{headerShown: false}}
                />
              ) : (
                <Stack.Screen
                  name="TutorialScreen"
                  options={{headerShown: false}}>
                  {() => (
                    <TutorialStackScreen
                      setIsAuthenticated={setIsAuthenticated}
                      setTutorialCompleted={setTutorialCompleted}
                    />
                  )}
                </Stack.Screen>
              )
            ) : (
              <Stack.Screen
                name="Home"
                options={{headerShown: false, gestureEnabled: false}}>
                {props => (
                  <HomeScreen
                    {...props}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )}
              </Stack.Screen>
            )}
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
