import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useAuth } from '../context/AuthContext';

// This is just a wrapper around LoginPage that sets isLogin to false
const RegisterPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // LoginPage will handle the registration form
  return <LoginPage initialMode="register" />;
};

export default RegisterPage;
