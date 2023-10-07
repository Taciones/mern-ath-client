import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useHistory
import Layout from "../core/Layout";
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Import the buffer polyfill
import { Buffer } from 'buffer';

// Ensure that Buffer is globally available
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const Activate = () => {
    const { token } = useParams(); // Use the useParams hook to access the 'token' parameter
    //const navigate = useNavigate(); // Use useNavigate for navigation

    const [values, setValues] = useState({
        name: "",
        show: true,
      });

      useEffect(() => {
        if (token) {
          let { name } = jwt.decode(token);
          setValues({ ...values, name });
        } else {
          setValues({ ...values, name: 'No Name' });
        }
      }, [token]);
  

  const { name } = values;

  const clickSubmit = event => {
    event.preventDefault();

    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/account-activation`,
        data: { token }
    })
    .then(response => {
        console.log('ACCOUNT ACTIVATION', response);
        setValues({...values, show: false});
        toast.success(response.data.message);
    })
    .catch(error => {
        console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
        toast.error(error.response.data.error);
    })
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">
        Hey {name}, Ready to activate your account?
      </h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
