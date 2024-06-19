import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from './UserContext';

const PrivateRoute = () => {
  const { loggedIn } = useUserContext();

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
