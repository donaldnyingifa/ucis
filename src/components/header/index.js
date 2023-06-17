import React from 'react'
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from '../../images/nimc_logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.scss'

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <Link to="/">
            <Image src={logo} width="400px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <ul className='header'>
            <li><Link to="/entertainer">
            STAFF LOGIN
            </Link></li>

            <li><Link to="/faq">
            FAQ
            </Link></li>

          </ul>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;