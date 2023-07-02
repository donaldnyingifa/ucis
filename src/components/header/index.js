import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { UserContext } from "../../UserContext";
import Image from "react-bootstrap/Image";
import logo from '../../images/default.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import './header.scss';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("ucisUser", null);
    navigate("/");
  };

  const isLoggedIn = user !== null && user !== 'null' && user.length > 2;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <Link to="/">
            <Image src={logo} width="150px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <ul className="header">
              {isLoggedIn && (

                <>
                  <li>
                    <Link to="/dashboard">
                      DASHBOARD
                    </Link>
                  </li>
                  <li>{user}</li>
                  <li>
                    <Button variant="warning" onClick={handleLogout}>
                      LOGOUT
                    </Button>
                  </li></>
              )}
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
