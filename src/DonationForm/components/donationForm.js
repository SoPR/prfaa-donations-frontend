import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Form, Input } from 'formsy-react-components';

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
                help="First Name and Last Name"
            />

            <Input
                name="organizationType"
                label="Organization Type"
            />

             <Input
                name="organizationName"
                label="Name of Organization"
            />


             <Input
                name="phoneNumber"
                label="Phone Number"
            />

             <Input
                name="email"
                label="Email"
            />

              <Input
                name="donationCategories"
                label="Categories of Donation"
            />

              <Input
                name="detailedDescription"
                label="Detailed Description"
            />

              <Input
                name="locationOfDonation"
                label="Location of the Goods/Service to be Donated"
            />

              <Input
                name="zipCode"
                label="Zip Code for the Location of the Goods/Service"
            />

              <Input
                name="transportationNeed"
                label="Do you need transportation of goods? "
            />

              <Input
                name="notes"
                label="Additional Notes "
            />

          <button type="submit" >Submit</button>
        </Formsy.Form>
    );
  }
}
