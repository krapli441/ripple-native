export type Coords = {
  latitude: number;
  longitude: number;
};

export type Region = Coords & {
  latitudeDelta: number;
  longitudeDelta: number;
};

export type LocationState = {
  coords: Coords | null;
  region: Region | null;
  gpsError: boolean;
};
