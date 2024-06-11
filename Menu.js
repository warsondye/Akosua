import React from 'react';
import { Nav } from 'react-bootstrap';

const Menu = () => {
  return (
    <Nav variant="pills" className="flex-column">
      <Nav.Item>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/settings">Settings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/edit-Details">Edit Details</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/news">News</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/request-exeat">Request Exeat</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/calendar">Calendar</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/visitschedule">Visit Schedule</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/insights">Insights</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Menu;
