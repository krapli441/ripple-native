// types/navigationTypes.ts

import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Ripple: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
