import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

interface GeolocationError {
  code: number;
  message: string;
}

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

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

const initialLocationState: LocationState = {
  coords: null,
  region: null,
  gpsError: false,
};

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 1000,
  timeout: 2000,
  distanceFilter: 3,
};

export default function useGeolocation() {
  const [locationState, setLocationState] =
    useState<LocationState>(initialLocationState);

  useEffect(() => {
    const handlePosition = (position: GeolocationPosition) => {
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
    };

    const handleError = (error: GeolocationError) => {
      console.log(error);
      setLocationState(prevState => ({...prevState, gpsError: true}));
    };

    Geolocation.getCurrentPosition(
      handlePosition,
      handleError,
      GEOLOCATION_OPTIONS,
    );

    const watchId = Geolocation.watchPosition(
      handlePosition,
      handleError,
      GEOLOCATION_OPTIONS,
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return locationState;
}
