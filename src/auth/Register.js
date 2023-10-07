import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuth } from "./helpers";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "tacio",
        email: "tacio.degrazia@gmail.com",
        password: "test123",
        buttonText: "Submit"
    });

    const {name, email, password, buttonText} = values

    const handleChange = name => event => {
        //console.log(event.target.value)
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });
    
        axios.post(`${process.env.REACT_APP_API}/register`, { name, email, password })
            .then(response => {
                console.log('RESPONSE:', response.data); // Log the response data
                const responseData = response.data;

                if (responseData.message) {
                    // Registration was successful
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    toast.success(responseData.message);
                } else {
                    // Registration failed
                    setValues({ ...values, buttonText: 'Submit' });
                    toast.error(responseData.error || 'Registration failed.');
                }
    })
    .catch(error => {
        console.error('ERROR:', error); // Log any errors
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error || 'Registration failed. Try again.');
    });

    };

    const registerForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
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
            {isAuth() ? navigate("/") : null}
            <h1 className="p-5 text-center">Register</h1>
            {registerForm()}
        </div>
        
    </Layout>
    );
};


export default Register;