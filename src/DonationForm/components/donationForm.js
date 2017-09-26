import React, { Component } from 'react';
import Formsy from 'formsy-react';
import InputMask from '../../utils/inputMask.js'

import {
  Form,
  Input,
  Select,
  Textarea
} from 'formsy-react-components';

import Options from '../lib/options.js'

const wrappedHandler = (handler) => {
      return (event) => {
        handler(event)
        this.setValue(event.currentTarget['value'])
      }
    }

export default class DonationForm extends Component {

  constructor() {
    super()
    this.state = {
      showTranportationOptions: false,
      invalidSubmit: false
    }
    this.phoneMask = new InputMask('(___) ___ - ____', '_')
    this.invalidSubmit = this.invalidSubmit.bind(this)
    this.isValid = this.isValid.bind(this)
    this.transportationNeededChanged = this.transportationNeededChanged.bind(this)

  }

  handleSubmission(data) {
    data.phoneNumber = data.phoneNumber.match(/\d+/g).join('')
    alert(JSON.stringify(data));
    console.log(data)
  }

  invalidSubmit() {
    console.log('invalid')
    this.setState({invalidSubmit: true})
  }

  isValid() {
    console.log('valid')
    this.setState({invalidSubmit: false})
  }

  transportationNeededChanged() {
    this.setState({showTranportationOptions: !this.state.showTranportationOptions})
  }

  render() {
    return (
        <Formsy.Form onChange={this.validateForm} onValidSubmit={this.handleSubmission} onValid={this.isValid} onInvalidSubmit={this.invalidSubmit}>
           <Input
                name="fullname"
                label="Full Name"
                help="First name and last name"
                placeholder="Full Name"
                required
            />
            <Select
                name="organizationType"
                label="Organization Type"
                help='Please select the category that applies'
                value='individual'
                options={Options.organizationTypeOptions}
                required
            />
           <Input
              name="organizationName"
              label="Name of Organization"
              help='Please fill if applicable'
              placeholder="Organization Name"
              rowClassName="green"
              labelClassName={[{'col-sm-3': false}, 'col-sm-3']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']}
          />
           <Input
              name="phoneNumber"
              label="Phone Number"
              help='Please type your phone number'
              placeholder="(XXX) - XXX - XXXX"
              onKeyDown={this.phoneMask.keyDownHandler}
		          onKeyUp={this.phoneMask.keyUpHandler}
              validations="isLength:16"
              validationErrors={{isLength: "Please enter complete phone number"}}
              required
          />
           <Input
              name="email"
              label="Email"
              help='Please type your email address'
              type='email'
              placeholder="Email address"
              validations="isEmail"
              required
          />

          <Select
            name="donationCategories"
            label="Categories of Donation"
            options={Options.donationCategoriesOptions}
            value='energy'
            required
          />
          <Textarea
            name="detailedDescription"
            label="Detailed Description"
            help='Please be precise. Example: "Water bottles", "1 Empty Container", "20 Satellite radios", etc.'
            placeholder="1000 water batttles, 10 Filled Containers, ect.."
          />
          <Input
            name="locationOfDonation"
            label="Location of the Goods/Service to be Donated"
            help='Example: "1 South Drive, Orlando, FL"'
            placeholder="Please write adress of Goods"
            required
          />
          <Input
            name="zipCode"
            label="Zip Code of the donation location entered above"
            help="Example: 11222"
            placeholder="Zip Code"
            required
            validations="isNumeric"
            validationErrors={{isNumeric: "Please use numbers only"}}
          />
          <Select
            name="transportationNeed"
            label="Do you need transportation of goods?"
            options={Options.needsTransportationOptions}
            value='no'
            onChange={this.transportationNeededChanged}
            required
          />
          {
            this.state.showTranportationOptions ?
            <Select
              name="transportationType"
              label="Type of transportation"
              help='Please be specific'
              options={Options.transportationTypeOptions}
              value='land'
              required
            /> :
            <Select
              name="transportationType"
              value=''
              style={{display: 'none'}}
            />
          }
          <Textarea
            name="notes"
            label="Additional Notes"
            help='Additional notes, comments, needs, etc'
            placeholder="Notes, comments, needs, ect.. "
          />

          <div>
            {this.state.invalidSubmit && <span class='help-block validation-message'>Please fix the errors above</span> }
          </div>

          <button type="submit" className="btn-default">Submit</button>

        </Formsy.Form>
    );
  }
}
