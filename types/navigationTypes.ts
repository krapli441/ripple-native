// types/navigationTypes.ts

import {StackNavigationProp} from '@react-navigation/stack';

export type TrackDetails = {
  title: string;
  artist: string;
  externalUrl: string;
  imageUrl: string;
};

export type RootStackParamList = {
  홈: undefined;
  Home: undefined;
  Ripple: undefined;
  SearchModal: undefined;
  MakeRippleScreen: {
    track?: TrackDetails;
    selectedTags?: string[];
  };
  SearchTagScreen: {
    currentTrack?: TrackDetails;
    selectedTags?: string[];
  };
  RippleCreatedScreen: {
    rippleData: {
      location: {
        latitude: number;
        longitude: number;
      };
      title: string;
      artist: string;
      albumCoverUrl: string;
      tag: string[];
    };
  };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
