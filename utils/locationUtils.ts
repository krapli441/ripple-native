import Geolocation from '@react-native-community/geolocation';
import {debounce} from 'lodash';

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

type SetLocationStateFunc = (state: LocationState) => void;

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
      distanceFilter: 3,
    },
  );
};

export const watchUserLocation = (
  setLocation: (region: Region) => void,
  setLocationState: Function,
  updateUserLocation: (coords: Coords) => void,
  GEOLOCATION_OPTIONS: Object,
  animateError: Function,
) => {
  const debouncedUpdate = debounce(updateUserLocation, 500);
  const watchId = Geolocation.watchPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const newCoords = {latitude, longitude};
      const newRegion = {
        ...newCoords,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
      setLocation(newRegion);
      setLocationState((prevState: LocationState) => ({
        ...prevState,
        gpsError: false,
      }));
      debouncedUpdate(newCoords);
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
      distanceFilter: 3,
    },
  );

  return () => Geolocation.clearWatch(watchId);
};
