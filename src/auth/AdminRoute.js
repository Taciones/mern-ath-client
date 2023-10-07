import React from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { isAuth } from "./helpers";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = isAuth();

  if (!user || user.role !== 'admin') {
    navigate('/login', { state: { from: location.pathname } });
    return null; // Redirect to login and don't render anything else
  }

  return <Outlet>{children}</Outlet>;
};

export default AdminRoute;
