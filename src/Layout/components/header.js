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
        <Navbar.Brand>
          <Link to='/'>Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Nav bsStyle="pills">
          <li role="presentation">
            <Link eventKey={1} to='/donation-form'>Donation form link</Link>
          </li>
          <li role="presentation">
            <Link eventKey={2} to='/donation-form/thank-you'>Thank You page link</Link>
          </li>
            <li role="presentation">
                <Link eventKey={3} to='/search'>Search page link</Link>
            </li>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
