import React from 'react'

import { Link } from 'react-router-dom'

import { 
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";

import SignInButton from '../components/SignInButton.jsx'

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Sample UI</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/topics">Topics</Nav.Link>
          
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
            <SignInButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
