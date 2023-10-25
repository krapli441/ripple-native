import Geolocation from '@react-native-community/geolocation';

type Coords = {
  latitude: number;
  longitude: number;
};

type Region = Coords & {
  latitudeDelta: number;
  longitudeDelta: number;
};

type LocationState = {
  coords: Coords | null;
  region: Region | null;
  gpsError: boolean;
};

export const fetchInitialLocation = (
  setLocationState: Function,
  GEOLOCATION_OPTIONS: Object,
  animateError: Function,
) => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const newCoords = {latitude, longitude};
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
      setLocationState({
        coords: newCoords,
        region: newRegion,
        gpsError: false,
      });
    },
    error => {
      console.log(error);
      setLocationState((prevState: LocationState) => ({
        ...prevState,
        gpsError: true,
      }));

      animateError(true);
    },
    {
      ...GEOLOCATION_OPTIONS,
      timeout: 2000,
      distanceFilter: 3,
    },
  );
};

export const watchUserLocation = (
  setLocationState: Function,
  updateUserLocation: Function,
  GEOLOCATION_OPTIONS: Object,
  animateError: Function,
) => {
  const watchId = Geolocation.watchPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const newCoords = {latitude, longitude};
      setLocationState((prevState: LocationState) => ({
        ...prevState,
        gpsError: true,
      }));

      updateUserLocation(newCoords);
    },
    error => {
      console.log(error);
      setLocationState((prevState: LocationState) => ({
        ...prevState,
        gpsError: true,
      }));
      animateError(true);
    },
    {
      ...GEOLOCATION_OPTIONS,
      timeout: 2000,
      distanceFilter: 3,
    },
  );

  return () => Geolocation.clearWatch(watchId);
};
