import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ThankYou extends Component {
    render() {
        return (
            <div>
                <h1>Thank You Page Under Construction</h1>
                <Link to='/'>Landing page link</Link>
                <Link to='/donation-form'>Donation form link</Link>
            </div>
        )
    }
}
