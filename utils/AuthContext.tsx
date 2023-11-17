import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  username: null,
  setUsername: () => {},
  userId: null,
  setUserId: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthDetails = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    loadAuthDetails();
  }, []);

  return (
    <AuthContext.Provider
      value={{token, setToken, username, setUsername, userId, setUserId}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
