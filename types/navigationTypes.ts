// types/navigationTypes.ts

import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Ripple: undefined;
  SearchModal: undefined;
  MakeRippleScreen: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
