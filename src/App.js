import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/layout';

import LandingPage from './LandingPage/components/landingPage';
import DonationForm from './DonationForm/components/donationForm';
import ThankYou from './ThankYou/components/thankYou';
import Confirm from './Confirm/components/confirm';
import Search from './Search/components/search';

import './Bootstrap3.3.7/bootstrap.min.css';
import 'react-table/react-table.css';

import './App.css';

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/donation-form" component={DonationForm} />
                    <Route exact path="/donation-form/thank-you" component={ThankYou} />
                    <Route exact path="/confirm" component={Confirm} />
                    <Route exact path="/search" component={Search} />
                </Switch>
            </Layout>
        );
    }
}

export default App;
