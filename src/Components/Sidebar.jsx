import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-light" style={{ height: '100vh', width: '250px' }}>
      <Nav className="flex-column p-3">
        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
        <Nav.Link href="#analytics">Analytics</Nav.Link>
        <Nav.Link href="#settings">Settings</Nav.Link>
        <Nav.Link href="/tasks">Topshiriq</Nav.Link>
        
        <Nav.Link href="/users">Users</Nav.Link>
        
        
        
      </Nav>
    </div>
  );
};

export default Sidebar;
