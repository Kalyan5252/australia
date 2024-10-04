'use client';
import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

interface AuthContextType {
  authData: {
    userType: 'user' | 'admin';
    isAuthenticated: boolean;
    userId: string;
  };
  setAuthData: Dispatch<
    SetStateAction<{
      userType: 'user' | 'admin';
      isAuthenticated: boolean;
      userId: string;
    }>
  >;
}

export const authContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  //   const [authData, setAuthData] = useState({
  //     userType: 'user',
  //     isAuthenticated: false,
  //   });
  const [authData, setAuthData] = useState<{
    userType: 'user' | 'admin';
    isAuthenticated: boolean;
    userId: string;
  }>({
    userType: 'user', // Initial value must be either 'user' or 'admin'
    isAuthenticated: false,
    userId: '',
  });
  return (
    <authContext.Provider value={{ authData, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
