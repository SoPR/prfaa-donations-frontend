import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
    Jumbotron,
    Button,
} from 'react-bootstrap'

export default class ThankYou extends Component {
  render() {
    return(
      <Grid>
        <Jumbotron>
          <Row className='text-center'>
            <p>Thank you for your submission. Please check your email for a confirmation.</p>
          </Row>
        </Jumbotron>
      </Grid>
    )
  }
}
