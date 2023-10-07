import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../core/Layout";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const PasswordReset = () => {
    const { token } = useParams();

    const [values, setValues] = useState({
        name: "",
        token: "",
        newPassword: "",
        buttonText: "Reset password."
    });

    useEffect(() => {
      if (token) {
        let { name } = jwt.decode(token);
        setValues({ ...values, token, name });
      } else {
        setValues({ ...values, token: '' });
      }
    }, [token]);

    const {name, newPassword, buttonText} = values

    const handleChange = newPassword => event => {
        //console.log(event.target.value)
        setValues({ ...values, [newPassword]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Sending...' });
    
        axios.put(`${process.env.REACT_APP_API}/reset-password`, { newPassword, resetPasswordLink: token })
            .then(response => {
                console.log('RESPONSE:', response.data); // Log the response data
                const responseData = response.data;

                if (responseData.message) {
                    // Registration was successful
                    console.log('RESET PASSWORD SUCCESS', response.data);
                    setValues({ ...values, newPassword: newPassword, buttonText: 'Requested' });
                    toast.success(responseData.message);
                } else {
                    // Registration failed
                    setValues({ ...values, buttonText: 'Reset password.' });
                    toast.error(responseData.error || 'Reset password link not sent.');
                }
            })
            .catch(error => {
                console.error('ERROR:', error); // Log any errors
                setValues({ ...values, buttonText: 'Reset password.' });
                toast.error(error.response.error || `Verify your password and try again.`);
            });

    };

    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('newPassword')} value={newPassword} type="password" className="form-control" placeholder="Type new password here" required/>
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
            <h1 className="p-5 text-center">Hey {name}, type your new password.</h1>
            {resetPasswordForm()}
        </div>
        
    </Layout>
    );
};


export default PasswordReset;