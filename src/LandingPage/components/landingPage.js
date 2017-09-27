import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return(
      <div>
        <h1>Landing Page Under Construction</h1>
        <Link to='/donation-form'>Donation form link</Link>
        <Link to='/donation-form/thank-you'>Thank You page link</Link>
      </div>
    )
  }
}
