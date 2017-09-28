import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage/components/landingPage.js'
import DonationForm from './DonationForm/components/donationForm.js'
import ThankYou from './ThankYou/components/thankYou.js'
import Confirm from './Confirm/components/confirm.js'

import './App.css';
import './styles/bootstrap.min.css';
import './styles/donationForm.css';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/donation-form" component={DonationForm} />
                <Route exact path="/donation-form/thank-you" component={ThankYou} />
                <Route exact path="/confirm" component={Confirm} />
            </Switch>
        );
    }
}

export default App;
