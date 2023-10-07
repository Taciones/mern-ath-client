import React, {useState} from "react";
import Layout from "../core/Layout";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const Forgot = () => {
    const [values, setValues] = useState({
        email: "",
        buttonText: "Send email reset link"
    });

    const {email, buttonText} = values

    const handleChange = name => event => {
        //console.log(event.target.value)
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Sending...' });
    
        axios.put(`${process.env.REACT_APP_API}/forgot-password`, { email })
            .then(response => {
                console.log('RESPONSE:', response.data); // Log the response data
                const responseData = response.data;

                if (responseData.message) {
                    // Registration was successful
                    setValues({ ...values, email: '', buttonText: 'Requested' });
                    toast.success(responseData.message);
                } else {
                    // Registration failed
                    setValues({ ...values, buttonText: 'Send email reset link' });
                    toast.error(responseData.error || 'Reset password link not sent.');
                }
            })
            .catch(error => {
                console.error('ERROR:', error); // Log any errors
                setValues({ ...values, buttonText: 'Send email reset link' });
                toast.error(error.response.error || `Verify it's a valid e-mail and try again.`);
            });

    };

    const forgotPasswordForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
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
            <h1 className="p-5 text-center">Forgot your password?</h1>
            {forgotPasswordForm()}
        </div>
        
    </Layout>
    );
};


export default Forgot;