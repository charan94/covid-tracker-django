import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavHeader = (props) => {


    return (
        <Navbar bg="white" expand="lg">
            <Container fluid>
                <Navbar.Brand href=".">Covid Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
    )

}

export default NavHeader;