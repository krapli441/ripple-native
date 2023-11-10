import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {Region} from 'react-native-maps';

interface LocationContextType {
  location: Region | null;
  setLocation: Dispatch<SetStateAction<Region | null>>;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [location, setLocation] = useState<Region | null>(null);

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
