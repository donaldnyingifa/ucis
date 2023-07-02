import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { signIn, auth } from "../../firebase";
import { TextField } from "@mui/material";
import { checkEmailContains } from "../../utils";
import "./login.scss";

function LoginComponent({ userName }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const isLoggedIn = user !== null && user !== 'null' && user.length > 2;

    const handleSignIn = () => {
        setLoading(true);
        setErr("");

        if (!checkEmailContains(email, userName)) {
            setErr('Not Authorized to login to this Organization');
            setLoading(false);
            return
        }

        signIn(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                let org = null;
                if (user.email) org = userName;
                setUser(org);
                await localStorage.setItem("ucisUser", user?.email);
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                setErr(errorMessage);
            });
    };
    console.log(user)

    return (
        <>
            <div className='login-wrapper'>
                {!isLoggedIn && (
                    <>
                        <h1 className='center-div'>{userName} Login</h1>
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
                    </>
                )}
                <br />
                {err && (
                    <div className='center-div'>
                        <p>{err}</p>
                    </div>
                )}
                <br />
                <div className='center-div'>
                    {isLoggedIn && <h3>Already Logged In</h3>}

                    {!isLoggedIn && (
                        <button disabled={loading} onClick={handleSignIn}>
                            {loading ? "loading..." : " SignIn"}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default LoginComponent;
