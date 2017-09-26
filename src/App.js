import React, { Component } from 'react';
import './App.css';
import './styles/bootstrap.min.css';
import './styles/donationForm.css';

import DonationForm from './DonationForm/components/donationForm.js'

class App extends Component {
    render() {
        return (
            <DonationForm/>
        );
    }
}

export default App;
