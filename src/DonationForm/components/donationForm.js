import React, { Component } from 'react';

import donationFormActions from '../actions/donationFormActions.js'

import InputMask from '../../utils/inputMask.js'
import Options from '../lib/options.js'

import {
    Form,
    Input,
    Select,
    Textarea
} from 'formsy-react-components';

import {
    Grid,
    Row,
    Col,
    Jumbotron,
    Button,
    ControlLabel
} from 'react-bootstrap'

import '../style/donationForm.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../style/donationForm.css';
import '../style/react-datepicker.css';

export default class DonationForm extends Component {
    constructor() {
        super()
        this.state                       = {
            showTranportationOptions: false,
            invalidSubmit:            false,
            submissionErrors:         [],
            expDate:                  null
        }
        this.phoneMask                   = new InputMask('(___) ___ - ____', '_')
        this.zipCodeMask                 = new InputMask('_____', '_')
        this.invalidSubmit               = this.invalidSubmit.bind(this)
        this.isValid                     = this.isValid.bind(this)
        this.transportationNeededChanged = this.transportationNeededChanged.bind(this)
        this.successfulSubmission        = this.successfulSubmission.bind(this)
        this.submissionError             = this.submissionError.bind(this)
        this.handleValidSubmission       = this.handleValidSubmission.bind(this)
        this.handleExpirationDateChange  = this.handleExpirationDateChange.bind(this)
    }

    componentDidMount() {
        document.addEventListener('donationSubmitted', this.successfulSubmission)
        document.addEventListener('submissionError', this.submissionError)
    }

    componentWillUnmount() {
        document.removeEventListener('donationSubmitted', this.successfulSubmission)
        document.removeEventListener('submissionError', this.submissionError)
    }

    successfulSubmission() {
        this.props.history.push('/donation-form/thank-you')
    }

    submissionError() {
        let errorArray = this.state.submissionErrors
        errorArray.push('There was an error processing your request.')
        this.setState({submissionErrors: errorArray})
    }

    handleValidSubmission(data) {
        data.phoneNumber = data.phoneNumber.match(/\d+/g).join('')
        data.zipCode     = data.zipCode.match(/\d+/g).join('')

        if (this.state.expDate) {
            data.expDate = this.state.expDate.format("M-D-YYYY");
        }

        alert(JSON.stringify(data));
        console.log(data)
        donationFormActions.submitFormRequest(data)
    }

    invalidSubmit() {
        let errorArray = this.state.submissionErrors
        errorArray.push('Please fix the errors above.')
        this.setState({submissionErrors: errorArray})
    }

    isValid() {
        let errorArray = this.state.submissionErrors
        let errorIndex = this.state.submissionErrors.indexOf('Please fix the errors above.')
        errorArray.splice(errorIndex, 1)
        this.setState({submissionErrors: errorArray})
    }

    transportationNeededChanged() {
        this.setState({showTranportationOptions: !this.state.showTranportationOptions})
    }

    handleExpirationDateChange(value) {
        this.setState({
            expDate: value
        });
    }

    render() {
        return (
            <Grid>
                <Jumbotron>
                    <div className="form-container">
                        <div className="text-header"> Donation Form</div>
                        <Form id="donation-form" onChange={this.validateForm} onValidSubmit={this.handleValidSubmission}
                              onValid={this.isValid}
                              onInvalidSubmit={this.invalidSubmit}>
                            <Input
                                name="fullname"
                                label="Full Name"
                                help="First name and last name"
                                placeholder="Full Name"
                                required
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />
                            <Select
                                name="organizationType"
                                label="Organization Type"
                                help='Please select the category that applies'
                                value='individual'
                                options={Options.organizationTypeOptions}
                                required
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />
                            <Input
                                name="organizationName"
                                label="Name of Organization"
                                help='Please fill if applicable'
                                placeholder="Organization Name"
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
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
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2 col-xs-12']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
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
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />

                            <Select
                                name="donationCategory"
                                label="Categories of Donation"
                                options={Options.donationCategoriesOptions}
                                value='energy'
                                required
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />
                            <Textarea
                                name="detailedDescription"
                                label="Detailed Description"
                                help='Please be precise. Example: "Water bottles", "1 Empty Container", "20 Satellite radios", etc.'
                                placeholder="1000 water batttles, 10 Filled Containers, ect.."
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />
                            <Input
                                name="locationOfDonation"
                                label="Location of the Goods/Service to be Donated"
                                help='Example: "1 South Drive, Orlando, FL"'
                                placeholder="Please write the address of the goods"
                                required
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />
                            <Input
                                name="zipCode"
                                label="Zip Code of the donation location entered above"
                                help="Example: 00959"
                                placeholder="XXXXX"
                                onKeyDown={this.zipCodeMask.keyDownHandler}
                                onKeyUp={this.zipCodeMask.keyUpHandler}
                                validations={
                                    {
                                        isNumeric: true,
                                        isLength:  5
                                    }
                                }
                                validationErrors={
                                    {
                                        isNumeric: "Please use numbers only",
                                        isLength:  "Please a 5 digit Zip Code"
                                    }
                                }
                                required
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />
                            <Select
                                name="transportationNeed"
                                label="Do you need transportation of goods?"
                                options={Options.needsTransportationOptions}
                                value={false}
                                onChange={this.transportationNeededChanged}
                                required
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
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
                                        labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                        elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                                    /> :
                                    <Select
                                        name="transportationType"
                                        value=''
                                        style={{display: 'none'}}
                                        rowClassName="addMargin"
                                        labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                        elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                                    />
                            }
                            <Row>
                                <Col md={2} mdOffset={2} style={{textAlign: 'right'}}>
                                    <ControlLabel>
                                        Offer Expiration
                                    </ControlLabel>
                                </Col>
                                <Col md={6} xs={12}>
                                    <DatePicker
                                        selected={this.state.expDate}
                                        onChange={this.handleExpirationDateChange}
                                        className="form-control"
                                        placeholderText="MM\DD\YYYY"
                                    />
                                </Col>
                            </Row>
                            <Textarea
                                name="notes"
                                label="Additional Notes"
                                help='Additional notes, comments, needs, etc'
                                placeholder="Notes, comments, needs, ect.. "
                                rowClassName="addMargin"
                                labelClassName={[{'col-sm-3': false}, 'col-md-2 col-md-offset-2']}
                                elementWrapperClassName={[{'col-sm-9': false}, 'col-md-6 col-xs-12']}
                            />

                            <Row>
                                <Col xs={12} mdOffset={3} md={6} className='has-error text-center'>
                                    {this.state.submissionErrors.length > 0 &&
                                    <span
                                        className='help-block validation-message'>{this.state.submissionErrors.join('/n')}</span>}
                                </Col>
                            </Row>

                            <Row className="form-group addMargin">
                                <div className="col-xs-12 text-center">
                                    <Button className="col-xs-12 col-md-6 col-md-offset-3" type="submit" bsSize="large"
                                            bsStyle="donate">
                                        Submit
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </Jumbotron>
            </Grid>
        );
    }
}
