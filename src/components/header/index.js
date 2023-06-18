import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { signOut, auth } from '../../firebase';
import { UserContext } from "../../UserContext";
import Image from "react-bootstrap/Image";
import logo from '../../images/nimc_logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.scss';

function Header() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleLogout() {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser('');
    }).catch((error) => {
      // An error happened.
      console.log('err', error);
    });
    // navigate('/');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <Link to="/">
            <Image src={logo} width="250px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <ul className="header">
              {!user &&
                (
                  <>
                    <li>
                      <Link to="/login">STAFF LOGIN</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                  </>
                )
              }

              {user?.email && <div>Hi {user.email}</div>}
              {user?.email && (
                <Button variant="warning" onClick={handleLogout}>
                  LOGOUT
                </Button>
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
