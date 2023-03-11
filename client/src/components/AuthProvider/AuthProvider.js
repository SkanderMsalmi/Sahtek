import {  useState } from 'react';
import { AuthContext } from '../../context/AuthContext';



export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  const setAuthInfo = ({ token, user }) => {
    localStorage.setItem('token', token);
    setAuthState({ token, user });
  };

  const setLogout = ({ token, user }) => {
    localStorage.removeItem('token');
    setAuthState({  user:null });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};