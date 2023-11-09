export type SpotifyArtist = {
  name: string;
};

export type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  external_urls: {
    spotify: string;
  };
  album: {
    images: [{url: string}];
  };
};

export type SpotifySearchResponse = {
  tracks: {
    items: SpotifyTrack[];
  };
};
