import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'

export default class LandingPage extends Component {
  render() {
    return(
      <Grid fluid id="landing-page">
        <Row>
          <Col xs={12} mdOffset={2} md={8} className="text-center landing-text">
            <h1>Welcome to the PRFAA Register a Donation Page</h1>
            <h3>If you want to donate, click on the button bellow to fill a form with all the details!</h3>
          </Col>
        </Row>
        <Row id="donate-button-conainer">
          <Col xs={12} className="text-center">
            <Link className="btn btn-lg btn-donate" to="/donation-form">Submit your donation</Link>
          </Col>
        </Row>
      </Grid>

    )
  }
}
