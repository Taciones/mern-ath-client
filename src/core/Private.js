import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";

import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Layout from "./Layout";
//import { useNavigate } from 'react-router-dom'

const Private = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        role: "",
        name: "",
        email: "",
        password: "",
        buttonText: "Submit"
    });

    const token = getCookie('token')
    
    const jwt = require('jsonwebtoken');
    const isTokenExpired = (token) => {
        try {
          // Verify the token to check its expiration
          jwt.verify(token, process.env.JWT_SECRET);
          // If verification succeeds, the token is not expired
          return false;
        } catch (err) {
          // If verification fails, check if the error is due to token expiration
          if (err.name === 'TokenExpiredError') {
            // Token has expired
            return true;
          } else {
            // Other errors occurred (e.g., invalid token)
            return false;
          }
        }
    };

    const isExpired = isTokenExpired(token);

    if (isExpired) {
    console.log('Token has expired.');
    } else {
    console.log('Token is valid.');
    };

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then(response => {
            console.log('PRIVATE PROFILE UPDATE', response)
            const {role, name, email} = response.data
            setValues({...values, role, name, email})
        })
        .catch(error => {
            console.error('Error loading private profile:', error);
            if(error.response.status == 401) {
                signout(() => {
                    navigate('/')
                })
            }
        });
    }

    const {role, name, email, password, buttonText} = values

    const handleChange = name => event => {
        //console.log(event.target.value)
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });
    
        axios.put(`${process.env.REACT_APP_API}/user/update`, { name, password  }, {
            headers: {
                'x-auth-token': `${token}`
            }
        })
            .then(response => {
                const responseData = response.data;
                console.log('RESPONSE:', response.data); // Log the response data

                if (responseData.message) {
                    console.log('UPDATE PROFILE SUCCESS', response)
                    updateUser(response, () => {
                        // Registration was successful
                        setValues({ ...values, buttonText: 'Submitted' });
                        toast.success('Profile updated successfully.');
                    })
                    
                } else {
                    // Registration failed
                    setValues({ ...values, buttonText: 'Submit' });
                    toast.error(responseData.error || 'Profile update failed.');
                }
            })
            .catch(error => {
                console.error('ERROR:', error); // Log any errors
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.data || 'Registration failed. Try again.');
            });

    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
//{JSON.stringify({name, email, password})} use the to view the data being changed on the front end.
    return (
    <Layout>
        <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className="pt-5 text-center">Private</h1>
            <h1 className="lead text-center">Profile Update</h1>
            {updateForm()}
        </div>
        
    </Layout>
    );
};


export default Private;
