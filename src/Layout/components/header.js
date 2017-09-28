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
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Home</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/donation-form">Donation form link</NavItem>
            <NavItem eventKey={2} href="/donation-form/thank-you">Thank You page link</NavItem>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}
