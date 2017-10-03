import React, { Component } from 'react';
import client from '../../Feathers';
import SearchForm from './searchForm';
import Login from './login';
import './search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        client.authenticate()
            .then(() => {
                // TODO: do something?
            })
            .catch((err) => this.setState({login: null}));

        client.on('authenticated', login => {
            this.setState({login});
        });
        client.on('logout', () => this.setState({
            login:         null,
            driveAccounts: null
        }));
    }

    logout = (e) => {
        e.preventDefault();

        return client.logout();
    }

    render() {
        let jsx = (
            <Login />
        );

        if (this.state.login === undefined) {
            jsx = (
                <p>Loading...</p>
            );
        }
        else if (this.state.login) {
            jsx = (
                <div>
                    <button onClick={this.logout}>Logout</button>
                    <SearchForm {...this.props} />
                </div>
            );
        }

        return jsx;
    }
}
