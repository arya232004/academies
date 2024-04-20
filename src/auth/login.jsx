import React from "react";
import GoogleButton from 'react-google-button'
import {auth,signInWithRedirect,googleProvider,getRedirectResult} from '../firebase'

function Login(props)
{
    const signIn = () => {
        signInWithRedirect(auth,googleProvider);
        getRedirectResult(auth).then((result) => {
            const user=result.user;
            console.log(user);
        }).catch((error) => {
            console.log(error.message);
        });
    }
    return(
        <div className="login">
            <GoogleButton
            onClick={signIn}
            />
        </div>
    );
}

export default Login;