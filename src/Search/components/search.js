import React, { Component } from 'react';
import client from '../../Feathers';
import uuid from 'node-uuid';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            results:    [],
            searchTerm: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value  = target.value;
        const name   = target.id;

        this.setState({
            [name]: value
        });
    }

    search = () => {
        const donationOffer = client.service('donation-offer');

        if (this.state.searchTerm.length) {
            return donationOffer.find({query: {$search: this.state.searchTerm}})
                .then((resultResponse) => this.setState({results: resultResponse.data}))
                .catch(alert);
        }
        else {
            return this.setState({results: []});
        }
    }

    render() {
        let results = [(<p key={uuid.v4()}>No results.</p>)];
        if (this.state.results.length) {
            results = this.state.results.map((result) => {
                let resultText = '';
                Object.keys(result).forEach((key) => resultText += key + ': ' + result[key] + ' | ');
                return (
                    <p key={result.id}>{resultText}</p>
                );
            });
        }

        return (
            <div>
                <h1>Search Donation Offers</h1>
                <input type="text" id="searchTerm" onChange={this.handleInputChange} />
                <button onClick={this.search}>Search</button>
                <hr />
                {results}
            </div>
        );
    }
}
