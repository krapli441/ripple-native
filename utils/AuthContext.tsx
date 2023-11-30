import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  tokenExpiry: Date | null;
  setTokenExpiry: React.Dispatch<React.SetStateAction<Date | null>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  userRefreshToken: string | null;
  setUserRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  tokenExpiry: null,
  setTokenExpiry: () => {},
  username: null,
  setUsername: () => {},
  userId: null,
  setUserId: () => {},
  userEmail: null,
  setUserEmail: () => {},
  userRefreshToken: null,
  setUserRefreshToken: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<Date | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRefreshToken, setUserRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthDetails = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserEmail = await AsyncStorage.getItem('userEmail');
      const storedUserRefreshToken = await AsyncStorage.getItem(
        'userRefreshToken',
      );
      const storedTokenExpiry = await AsyncStorage.getItem('tokenExpiry');

      if (storedToken) {
        setToken(storedToken);
      }
      if (storedTokenExpiry) {
        const expiryDate = new Date(storedTokenExpiry);
        setTokenExpiry(expiryDate);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedUserId) {
        setUserId(storedUserId);
      }
      if (storedUserEmail) {
        setUserEmail(storedUserEmail);
      }
      if (storedUserRefreshToken) {
        setUserRefreshToken(storedUserRefreshToken);
      }
    };

    loadAuthDetails();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        tokenExpiry,
        setTokenExpiry,
        username,
        setUsername,
        userId,
        setUserId,
        userEmail,
        setUserEmail,
        userRefreshToken,
        setUserRefreshToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
