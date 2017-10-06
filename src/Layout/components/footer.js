import React from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

export default function Footer() {
  return (
    <div className='footer'>
      <Grid>
        <Row className="subFooter">
          <Col xs={12} className="text-center">
            <p>Powered by DonDB</p>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
