import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button
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
            <Button bsStyle="donate" bsSize="large" href='/donation-form'>Donation form link</Button>
          </Col>
        </Row>
      </Grid>

    )
  }
}
