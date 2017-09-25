import React, { Component } from 'react';
import client from './Feathers';
import './App.css';

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
            <div className="App">
                <div className="field">
                    <label className="label" htmlFor="email">Your Email</label>
                    <input id="email" className="input" type="text" placeholder="you@example.com"
                           value={this.state.email} onChange={this.handleInputChange} />
                </div>

                <div className="field">
                    <label className="label" htmlFor="donation">Donation</label>
                    <input id="offer" className="input" type="text"
                           value={this.state.offer} onChange={this.handleInputChange} />
                </div>

                <button onClick={this.handleSubmit}>Save</button>
            </div>
        );
    }
}

export default App;
