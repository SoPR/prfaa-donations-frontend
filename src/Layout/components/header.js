import React  from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import branding from '../../brandingConfig';

export default function Header() {
  return(
    <Navbar staticTop>
      <Navbar.Header>
        <Navbar.Brand>
            <Link to="/">{branding.logoUrl ? <img src={branding.logoUrl} alt="Home" />: 'Home'}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav bsStyle="pills">
          <LinkContainer to='/donation-form'>
            <NavItem eventKey={1}>
              Submit your donation
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/search'>
            <NavItem eventKey={2}>
              Search
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}