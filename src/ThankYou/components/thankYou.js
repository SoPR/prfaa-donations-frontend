import React from 'react';
import {
    Grid,
    Row,
    Jumbotron,
} from 'react-bootstrap'

export default function ThankYou() {
  return (
      <Grid>
        <Jumbotron>
          <Row className='text-center'>
            <p>Thank you for your submission. Please check your email for a confirmation.</p>
          </Row>
        </Jumbotron>
      </Grid>
   );
}
