import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { UserContext } from "../../UserContext";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { signIn, auth } from "../../firebase";
import { TextField } from "@mui/material";
import "./login.scss";

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { signInUser, user } = useContext(UserContext); // Access signInUser from the UserContext
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [err, setErr] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSignIn = () => {
        setLoading(true)
        setErr('');
        // Add your logic to handle the sign-in process or API calls here

        signIn(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                signInUser(user);
                setLoading(false);
                navigate("/");
                // window.location.href = '/'
            })
            .catch((error) => {
                setLoading(false);
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
                        loading && (<><div className='center-div'>loading...</div> <br /></>)
                    }
                    {
                        !user?.email && <button disabled={loading}  onClick={handleSignIn}>SignIn</button>
                    }
                    
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
