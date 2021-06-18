import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const NavHeader = (props) => {
    return (
        <Navbar bg="white" expand="lg" className="justify-content-center">
            <Navbar.Brand href=".">Covid Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    )
}

export default NavHeader;