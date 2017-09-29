import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'

export default class ThankYou extends Component {
  render() {
    return(
      <footer>
        <Grid>
          <Row className="subFooter">
            <Col xs={12} className="text-center">
              <p>Powered by DonDB</p>
            </Col>
          </Row>
        </Grid>

      </footer>

    )
  }
}
