import React from "react";
import { Routes, Route, Router, useNavigate } from 'react-router-dom';
import App from "./App";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import Admin from "./core/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Forgot from "./auth/ForgotPassword";
import PasswordReset from "./auth/PasswordReset"


const RoutesComponent = () => {
    return (
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="/register" exact element={<Register />} /> 
                <Route path="/login" exact element={<Login />} /> 
                <Route path="/auth/activate/:token" exact element={<Activate />} /> 
                <Route path="/auth/password/forgot" exact element={<Forgot />} /> 
                <Route path="/auth/password/reset/:token" exact element={<PasswordReset />} /> 
                <Route element={<PrivateRoute />} >
                    <Route element={<Private />} path="/private"/>
                </Route>
                <Route element={<AdminRoute />} >
                    <Route element={<Admin />} path="/admin"/>
                </Route>
            </Routes>        
    );
};

export default RoutesComponent;
