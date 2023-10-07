import React from "react";
import { isAuth, authenticate } from "./helpers";
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const Google = () => {
    const responseGoogle = (response) => {
        console.log(response)
    }
    return (
        <div className="pb-3">
            <GoogleLogin 
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}>
            </GoogleLogin>
        </div>
    )
}

export default Google;

//Unfinished this login with google. React 18 is not working with this library anymore..