import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { signIn, auth } from "../../firebase";
import { TextField } from "@mui/material";
import "./login.scss";

function Login() {
    const { signInUser, user } = useContext(UserContext); // Access signInUser from the UserContext
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [err, setErr] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSignIn = () => {
        console.log("Email:", email);
        console.log("Password:", password);
        setErr('');
        // Add your logic to handle the sign-in process or API calls here

        signIn(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                signInUser(user);
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErr(errorMessage);
            });
    };

    return (
        <>
            <Header />
            <div className='login-wrapper'>
                <h1 className='center-div'>Login</h1>
                <div className='center-div'>
                    <TextField
                        id='email'
                        type='email'
                        label='Email'
                        variant='standard'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <br />
                <div className='center-div'>
                    <TextField
                        id='password'
                        type='password'
                        label='Password'
                        variant='standard'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                {err && (
                    <div className='center-div'>
                        <p>{err}</p>
                    </div>
                )}
                <br />
                <div className='center-div'>
                    {
                        user?.email && <h3>Already Logged In</h3>
                    }
                    {
                        !user?.email && <button  onClick={handleSignIn}>SignIn</button>
                    }
                    
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
