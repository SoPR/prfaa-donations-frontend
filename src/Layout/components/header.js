import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap'

import branding from '../../brandingConfig';

class Header extends Component {
    render() {
        return (
            <Navbar staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">{branding.logoUrl ? <img src={branding.logoUrl} alt="Home" />: 'Home'}</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.props.history.push('/donation-form')}>
                            Submit your donation
                        </NavItem>
                        <NavItem eventKey={2} onClick={() => this.props.history.push('/search')}>
                            Search
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}


export default withRouter(Header);
