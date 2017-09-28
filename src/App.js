import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout/layout.js'
import Footer from './Layout/components/footer.js'

import LandingPage from './LandingPage/components/landingPage.js'
import DonationForm from './DonationForm/components/donationForm.js'
import ThankYou from './ThankYou/components/thankYou.js'
import Confirm from './Confirm/components/confirm.js'

import './Bootstrap3.3.7/bootstrap.min.css';

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
            </Switch>
          </Layout>
        );
    }
}

export default App;
