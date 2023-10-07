import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../core/Layout";
import axios from 'axios';
import { authenticate, isAuth } from "./helpers";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Google from "./GoogleSignIn";




const Login = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "tacio.degrazia@gmail.com",
        password: "test123",
        buttonText: "Submit"
    });

    const {email, password, buttonText} = values

    const handleChange = name => event => {
        //console.log(event.target.value)
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting...' });
    
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/login`,
            data: { email, password }
        })
        .then(response => {
            // Check if the response contains a user object
            if (response.data && response.data.user && response.data.user.name) {
                const userName = response.data.user.name;
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    //toast.success(`Hey ${userName}, Welcome back!`);
                    isAuth() && isAuth().role == 'admin' ? navigate("/admin") : navigate("/private")
                })

                
            } else {
                // Handle the case where there's no user object in the response
                toast.error("Login failed. Please try again.");
            }
        })
        .catch(error => {
            console.log('LOGIN ERROR', error.response.data);
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        });

    };

    const signinForm = () => (
        <form>
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
            <h1 className="p-5 text-center">Signin</h1>
            <Google />
            {signinForm()}
            <br />
            <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">  
                Forgot Password
            </Link>
        </div>
        
    </Layout>
    );
};


export default Login;