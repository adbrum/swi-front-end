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
  token: any;
  // decoded: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SWI:token');
    const id = localStorage.getItem('@SWI:id');
    // const username = localStorage.getItem('@SWI:username');

    if (token) {
      return { token };
    }
    return {} as AuthState;
  });
  const [decode, setDecoded] = useState<string>('');

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('users/token/obtain/', {
      username,
      password,
    });

    let token = response.data.access;

    localStorage.setItem('@SWI:token', token);

    console.log(response.data);

    token = jwt_decode(token);

    // console.log(token.user_id);

    // localStorage.setItem('@SWI:username', JSON.stringify(username));

    setData({ token: token.user_id });

    localStorage.setItem('@SWI:id', data.token);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SWI:token');
    // localStorage.removeItem('@SWI:username');

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
