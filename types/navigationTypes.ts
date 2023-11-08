// types/navigationTypes.ts

import {StackNavigationProp} from '@react-navigation/stack';

export type TrackDetails = {
  title: string;
  artist: string;
  externalUrl: string;
  imageUrl: string;
};

export type RootStackParamList = {
  Home: undefined;
  Ripple: undefined;
  SearchModal: undefined;
  MakeRippleScreen: {
    track?: TrackDetails;
    selectedTags?: string[];
  };
  SearchTagScreen: {
    currentTrack?: TrackDetails;
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
