import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const DashboardNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Mehnat va me'yorlashtirish bo'limi </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="/">Logout</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default DashboardNavbar;
