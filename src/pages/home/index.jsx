import React, { useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import "./home.scss";
import { Button } from "@mui/material";

function Home() {
    const { user } = useContext(UserContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(user);

    const isLoggedIn = user !== null && user !== "null" && user.length > 2;
    return (
        <>
            <div className='home'>
                <Row className='about'>
                    <Col>
                        <div>
                            {!isLoggedIn && (
                                <>
                                    <Link to={{ pathname: "/login", search: "?name=NIMC" }}>
                                        <Button>NIMC LOGIN</Button>
                                    </Link>
                                    <Link to={{ pathname: "/login", search: "?name=INEC" }}>
                                        <Button>INEC LOGIN</Button>
                                    </Link>
                                    <Link to={{ pathname: "/login", search: "?name=CBN" }}>
                                        <Button>CBN LOGIN</Button>
                                    </Link>
                                    <Link to={{ pathname: "/login", search: "?name=FRSC" }}>
                                        <Button>FRSC LOGIN</Button>
                                    </Link>
                                    <Link to={{ pathname: "/login", search: "?name=FIRS" }}>
                                        <Button>FIRS LOGIN</Button>
                                    </Link>
                                    <Link to={{ pathname: "/login", search: "?name=NHIS" }}>
                                        <Button>NHIS LOGIN</Button>
                                    </Link>
                                </>
                            )}

                            {isLoggedIn && (
                                <>
                                    <Link to='/dashboard'>
                                        <Button>DASHBOARD </Button>
                                    </Link>
                                    {user === "NIMC" && (
                                        <Link to='/register'>
                                            <Button> REGISTER USER </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Home;
