export type Ripple = {
  _id: string;
  albumCoverUrl: string;
  artist: string;
  createdAt: string;
  expiresAt: string;
  likedUsers: string[];
  location: {
    coordinates: number[];
    type: string;
  };
  spotifyExternalUrl: string;
  tag: string[];
  title: string;
  updatedAt: string;
  userId: string;
};
