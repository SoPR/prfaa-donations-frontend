import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
} from 'react-bootstrap'

export default class ThankYou extends Component {

    render() {
        return (
            <Navbar staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <li>
                            <Link to="/donation-form">Donation form link</Link>
                        </li>
                        <li>
                            <Link to="/donation-form/thank-you">Thank You page link</Link>
                        </li>
                        <li>
                            <Link to="/search">Search page link</Link>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
