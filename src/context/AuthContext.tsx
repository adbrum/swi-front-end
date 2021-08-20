import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  key: string;
  // username: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  key: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const key = localStorage.getItem('@SWI:key');
    // const username = localStorage.getItem('@SWI:username');

    if (key) {
      return { key };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth/login/', {
      email,
      password,
    });

    const { key } = response.data;

    console.log(key);

    localStorage.setItem('@SWI:key', key);
    // localStorage.setItem('@SWI:username', JSON.stringify(username));

    setData({ key });
  }, []);

  return (
    <AuthContext.Provider value={{ key: data.key, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
