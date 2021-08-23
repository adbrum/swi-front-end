import React, { createContext, useCallback, useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import api from '../services/api';

interface AuthState {
  token: string;
  // username: object;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SWI:token');

    if (token) {
      return { token };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('users/token/obtain/', {
      username,
      password,
    });

    const token = response.data.access;

    localStorage.setItem('@SWI:token', token);

    // console.log(response.data);

    setData({ token: jwt_decode(token) });

    localStorage.setItem('@SWI:id', data.token);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SWI:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
