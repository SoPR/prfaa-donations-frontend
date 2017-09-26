import React, { Component } from 'react';
import client from './Feathers';
import './App.css';
import 'react-bootstrap';

import DonationForm from './DonationForm/components/donationForm.js'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            offer: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.id;

        console.log('setting:', name, value);
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const donationOffersService = client.service('donation-offer');
        donationOffersService.create({
            email:  this.state.email,
            offers: [this.state.offer]
        })
            .then((result) => {
                console.log('saved as:', result);
                this.setState({email: '', offer: ''});
            })
            .catch(alert);
    }

    render() {
        return (
            <DonationForm/>
        );
    }
}

export default App;
