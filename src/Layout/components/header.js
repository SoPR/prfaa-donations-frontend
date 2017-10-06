import React  from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default function Header() {
  return(
    <Navbar collapseOnSelect>
      <Navbar.Brand>
        <Link to='/'>Home</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav bsStyle="pills">
          <LinkContainer exact to='/donation-form'>
            <NavItem eventKey={1}>
              Donation form link
            </NavItem>
          </LinkContainer>
          <LinkContainer exact to='/donation-form/thank-you'>
            <NavItem eventKey={2}>
              Thank You page link
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/search'>
            <NavItem eventKey={3}>
              Search page link
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
