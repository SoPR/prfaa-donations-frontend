import React, { Component } from 'react';
import client from '../../Feathers';
import searchActions from '../actions/searchActions'

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

    claim = (id) => {
        const data = {
            acceptedBy: 'Placeholder Name',
            id
        }
        searchActions.acceptDonation(data)
    }

    render() {
        let results = [(<p>No results.</p>)];
        if (this.state.results.length) {
            results = this.state.results.map((result) => {
                let resultText = '';
                Object.keys(result).forEach((key) => resultText += key + ': ' + result[key] + ' | ');
                return (
                    <p key={result.id}>
                        <button onClick={() => this.claim(result.id)}>Claim</button>
                        {resultText}
                    </p>
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
