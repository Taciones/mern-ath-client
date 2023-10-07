import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children }) => {
  const location = useLocation();

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
  <li className="nav-item">
    <Link
      to="/"
      className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      style={{ color: location.pathname === '/' ? 'black' : 'white' }}
    >
      Home
    </Link>
  </li>
    {!isAuth() && (
        <Fragment>
            <li className="nav-item">
                <Link
                    to="/login"
                    className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                    style={{ color: location.pathname === '/login' ? 'black' : 'white' }}
                    >
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/register"
                    className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                    style={{ color: location.pathname === '/register' ? 'black' : 'white' }}
                    >
                    Register
                </Link>
            </li>
        </Fragment>
    )}
    {isAuth() && isAuth().role == 'admin' && (
        <Fragment>
            <li className="nav-item">
                <Link   to="/admin"
                        className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                        style={{ color: location.pathname === '/admin' ? 'black' : 'white' }}>
                        {isAuth().name}
                </Link>
            </li>
        </Fragment>
    )}

    {isAuth() && isAuth().role == 'subscriber' && (
        <Fragment>
            <li className="nav-item">
                <Link   to="/private"
                        className={`nav-link ${location.pathname === '/private' ? 'active' : ''}`}
                        style={{ color: location.pathname === '/private' ? 'black' : 'white' }}>
                        {isAuth().name}
                </Link>
            </li>
        </Fragment>
    )}

    {isAuth() && (
        <Fragment>
            <li className="nav-item">
            <Link
                to="/"
                className="nav-link"
                style={{cursor: 'pointer', color: 'white'}}
                //className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                //style={{ color: location.pathname === '/' ? 'black' : 'white' }}
                onClick={signout}
            >
                Logout
            </Link>
            </li>
        </Fragment>
    )}
</ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
