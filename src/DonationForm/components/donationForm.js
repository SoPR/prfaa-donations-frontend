import React, { Component } from 'react';
import Formsy from 'formsy-react';
import InputMask from '../../utils/inputMask.js'
import donationFormActions from '../actions/donationFormActions.js'

import {
  Form,
  Input,
  Select,
  Textarea
} from 'formsy-react-components';

import Options from '../lib/options.js'

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

  handleValidSubmission(data) {
    data.phoneNumber = data.phoneNumber.match(/\d+/g).join('')
    alert(JSON.stringify(data));
    console.log(data)
    donationFormActions.submitFormRequest(data)
  }

  invalidSubmit() { this.setState({invalidSubmit: true}) }

  isValid() { this.setState({invalidSubmit: false}) }

  transportationNeededChanged() {
    this.setState({showTranportationOptions: !this.state.showTranportationOptions})
  }

  render() {
    return (
        <div className="form-container">
          <div className="text-header"> Donation Form </div>
        <Formsy.Form onChange={this.validateForm} onValidSubmit={this.handleValidSubmission} onValid={this.isValid} onInvalidSubmit={this.invalidSubmit}>
           <Input
                name="fullname"
                label="Full Name"
                help="First name and last name"
                placeholder="Full Name"
                required
                rowClassName="addMargin"
                labelClassName={[{'col-sm-3': false}, 'col-md-2']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
            />
            <Select
                name="organizationType"
                label="Organization Type"
                help='Please select the category that applies'
                value='individual'
                options={Options.organizationTypeOptions}
                required
                rowClassName="addMargin"
                labelClassName={[{'col-sm-3': false}, 'col-md-2']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
            />
           <Input
              name="organizationName"
              label="Name of Organization"
              help='Please fill if applicable'
              placeholder="Organization Name"
              rowClassName="addMargin"
              labelClassName={[{'col-sm-3': false}, 'col-md-2']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
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
              rowClassName="addMargin"
              labelClassName={[{'col-sm-3': false}, 'col-md-2']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-md-2']}
          />
           <Input
              name="email"
              label="Email"
              help='Please type your email address'
              type='email'
              placeholder="Email address"
              validations="isEmail"
              required
              rowClassName="addMargin"
              labelClassName={[{'col-sm-3': false}, 'col-md-2']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
          />

          <Select
            name="donationCategories"
            label="Categories of Donation"
            options={Options.donationCategoriesOptions}
            value='energy'
            required
            rowClassName="addMargin"
            labelClassName={[{'col-sm-3': false}, 'col-md-2']}
            elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
          />
          <Textarea
            name="detailedDescription"
            label="Detailed Description"
            help='Please be precise. Example: "Water bottles", "1 Empty Container", "20 Satellite radios", etc.'
            placeholder="1000 water batttles, 10 Filled Containers, ect.."
            rowClassName="addMargin"
            labelClassName={[{'col-sm-3': false}, 'col-md-2']}
            elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
          />
          <Input
            name="locationOfDonation"
            label="Location of the Goods/Service to be Donated"
            help='Example: "1 South Drive, Orlando, FL"'
            placeholder="Please write adress of Goods"
            required
            rowClassName="addMargin"
            labelClassName={[{'col-sm-3': false}, 'col-md-2']}
            elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
          />
          <Input
            name="zipCode"
            label="Zip Code of the donation location entered above"
            help="Example: 11222"
            placeholder="Zip Code"
            required
            validations="isNumeric"
            validationErrors={{isNumeric: "Please use numbers only"}}
            rowClassName="addMargin"
            labelClassName={[{'col-sm-3': false}, 'col-md-2']}
            elementWrapperClassName={[{'col-sm-9': false}, 'col-md-2']}
          />
          <Select
            name="transportationNeed"
            label="Do you need transportation of goods?"
            options={Options.needsTransportationOptions}
            value='no'
            onChange={this.transportationNeededChanged}
            required
            rowClassName="addMargin"
            labelClassName={[{'col-sm-3': false}, 'col-md-2']}
            elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
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
              rowClassName="addMargin"
              labelClassName={[{'col-sm-3': false}, 'col-md-2']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
            /> :
            <Select
              name="transportationType"
              value=''
              style={{display: 'none'}}
              rowClassName="addMargin"
              labelClassName={[{'col-sm-3': false}, 'col-md-2']}
              elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
            />
          }
          <Textarea
            name="notes"
            label="Additional Notes"
            help='Additional notes, comments, needs, etc'
            placeholder="Notes, comments, needs, ect.. "
            rowClassName="addMargin"
            labelClassName={[{'col-sm-3': false}, 'col-md-2']}
            elementWrapperClassName={[{'col-sm-9': false}, 'col-md-5']}
          />

          <div className='has-error'>
            {this.state.invalidSubmit && <span className='help-block validation-message'>Please fix the errors above</span> }
          </div>

          <div className="form-group">
           <div className="col-xs-12 center col-md-5">
          <button type="submit" className="btn btn-success">Submit</button>
          </div>
          </div>
        </Formsy.Form>
        </div>
    );
  }
}
