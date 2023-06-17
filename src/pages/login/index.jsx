import React, {useEffect} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { TextField } from "@mui/material";
import './login.scss'

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
    return (
        <>
            <Header />
            <div className="login-wrapper">
            <div className="center-div">
                <TextField id='email' type="email" label='Email' variant='standard' />
            </div>
            <br />
            <div className="center-div">
                <TextField id='password' type="password" label='Password' variant='standard' />
            </div>
            </div>
            
            <Footer />
        </>
    );
}

export default Login;
