import React, { Component } from 'react';
import ReactTable from 'react-table';
import queryString from 'query-string';

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

    componentDidMount() {
        const { location } = this.props;
        const { search } = location;
        if (search && queryString.parse(search).q) {
            this.setState({ searchTerm: queryString.parse(search).q }, () => {
                this.search();
            }); 
        }
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
        let results = <p>No results.</p>;
        if (this.state.results.length) {
            results = (
                <ReactTable
                    data={this.state.results}
                    columns={[
                    {
                        Header: "Full Name",
                        accessor: "fullname"
                    },
                    {
                        Header: "Organization Type",
                        accessor: "organizationType"
                    },
                    {
                        Header: "Organization",
                        accessor: "organizationName"
                    },
                    {
                        Header: "Phone Number",
                        accessor: "phoneNumber"
                    },
                    {
                        Header: "Email",
                        accessor: "email"
                    },
                    {
                        Header: "Category",
                        accessor: "donationCategory"
                    },
                    {
                        Header: "Description",
                        accessor: "detailedDescription"
                    },
                    {
                        Header: "Location",
                        accessor: "locationOfDonation"
                    },
                    {
                        Header: "Zip Code",
                        accessor: "zipCode"
                    },
                    {
                        Header: "Needs Transportation",
                        accessor: "transportationNeed"
                    },
                    {
                        Header: "Type of Transportation",
                        accessor: "transportationType"
                    },
                    {
                        Header: "Notes",
                        accessor: "notes"
                    },
                    {
                        Header: "Expiration Date",
                        accessor: "expDate"
                    },
                    {
                        Header: "Confirmed",
                        accessor: "isConfirmed"
                    },
                    {
                        Header: "Verified",
                        accessor: "isVerified"
                    },
                    {
                        Header: "Accepted",
                        accessor: "isAccepted"
                    }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
            );
        }

        return (
            <div>
                <h1>Search Donation Offers</h1>
                <input type="text" id="searchTerm" value={this.state.searchTerm} onChange={this.handleInputChange} />
                <button onClick={this.search}>Search</button>
                <hr />
                {results}
            </div>
        );
    }
}
