import React, { Component } from 'react';
import Formsy from 'formsy-react';
import {
  Form,
  Input,
  Select,
  Textarea
} from 'formsy-react-components';

import Options from '../lib/options.js'

export default class DonationForm extends Component {

submit(data) {
  alert(JSON.stringify(data));
}

  render() {
    return (
        <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
           <Input
                name="firstname"
                label="Full Name"
                help="First name and last name"
            />
            <Select
                name="organizationType"
                label="Organization Type"
                help='Please select the category that applies'
                options={Options.organizationTypeOptions}
            />
           <Input
              name="organizationName"
              label="Name of Organization"
              help='Please fill if applicable'
          />
           <Input
              name="phoneNumber"
              label="Phone Number"
              help='Please type your phone number using this format (XXX) - XXX - XXXX'
          />
           <Input
              name="email"
              label="Email"
              help='Please type your email address'
          />

          <Select
            name="donationCategories"
            label="Categories of Donation"
            options={Options.donationCategoriesOptions}
          />
          <Textarea
            name="detailedDescription"
            label="Detailed Description"
            help='Please be precise. Example: "Water bottles", "1 Empty Container", "20 Satellite radios", etc.'
          />
          <Input
            name="locationOfDonation"
            label="Location of the Goods/Service to be Donated"
            help='Example: "1 South Drive, Orlando, FL"'
          />
          <Input
            name="zipCode"
            label="Zip Code of the donation location entered above"
          />
          <Select
            name="transportationNeed"
            label="Do you need transportation of goods?"
            options={Options.needsTransportationOptions}
          />
          <Select
            name="transportationType"
            label="Type of transportation"
            help='Please be specific'
            options={Options.transportationTypeOptions}
          />
          <Textarea
            name="notes"
            label="Additional Notes"
            help='Additional notes, comments, needs, etc'
          />
          <button type="submit" >Submit</button>
        </Formsy.Form>
    );
  }
}
