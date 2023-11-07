// types/navigationTypes.ts

import {StackNavigationProp} from '@react-navigation/stack';

type TrackDetails = {
  title: string;
  artist: string;
  externalUrl: string;
  imageUrl: string;
};

export type RootStackParamList = {
  Home: undefined;
  Ripple: undefined;
  SearchModal: undefined;
  MakeRippleScreen: {track: TrackDetails} | undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
