import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

export default class ThankYou extends Component {

  render() {
    return(
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
          <NavItem>
            <Link eventKey={1} to="/donation-form">Donation form link</Link>
          </NavItem>
          <NavItem>
            <Link eventKey={2} to="/donation-form/thank-you">Thank You page link</Link>
          </NavItem>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
