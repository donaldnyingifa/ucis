import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginComponent from "../../components/login";
import "./login.scss";

function Login() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");
    console.log(name);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <LoginComponent userName={name} />
        </>
    );
}

export default Login;
