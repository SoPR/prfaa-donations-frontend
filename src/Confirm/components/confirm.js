import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import client from '../../Feathers';
import {
    Grid,
    Jumbotron,
    Row,
    Col
} from 'react-bootstrap';
import FaCheck from 'react-icons/lib/fa/check';
import FaSpinner from 'react-icons/lib/fa/spinner';


export default class Confirm extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            confirmed: false,
            error:     false
        }
    }

    componentDidMount() {
        const confirmService = client.service('confirm');
        const qs             = queryString.parse(this.props.location.search);

        if (qs.id) {
            confirmService.get(qs.id)
                .then(() => this.setState({ confirmed: true }))
                .catch((err) => this.setState({ error: err }));
        }
    }

    render() {
        let jsx = null;

        if (!this.state.confirmed && !this.state.error) {
            jsx = (
                <div>
                    <h2>Confirming your Donation... (please wait)</h2>
                    <div className="svg-spin"><FaSpinner className="fa-spin"/></div>
                </div>
            );
        }
        else if (this.state.confirmed) {
            jsx = (
                <div>
                    <h1 className="green"><FaCheck /></h1>
                    <h1>Thank You for Confirming your Donation!</h1>
                    <p>
                        Your donation offer has been confirmed.<br />
                        A PRFAA agent will be in touch with you regarding your donation.<br />
                        Thank you again!
                    </p>
                    <Link className="btn btn-lg btn-donate" to='/'>Go Back to the Home Page</Link>
                </div>
            );
        }
        else if (this.state.error) {
            jsx = (
                <div>
                    <h1>Sorry, we were unable to confirm your donation at this time.</h1>
                    <p>
                        Please try again later or <Link to='/donation-offer'>resubmit your donation</Link>.
                    </p>
                </div>
            );
        }

        return (
            <Grid fluid>
                <Jumbotron>
                    <Row>
                        <Col xs={12} className="text-center">
                            {jsx}
                        </Col>
                    </Row>
                </Jumbotron>
            </Grid>);
    }
}
