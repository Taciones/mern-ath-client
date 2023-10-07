import React from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { isAuth } from "./helpers";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuth()) {
    navigate('/login', { state: { from: location.pathname } });
    return null; // Redirect to login and don't render anything else
  }

  return <Outlet>{children}</Outlet>;
};

export default PrivateRoute;
