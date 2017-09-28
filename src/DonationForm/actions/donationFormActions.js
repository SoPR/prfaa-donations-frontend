import axios from 'axios';

const donationSubmitted = new Event('donationSubmitted');
const submissionError = new Event('submissionError');

const submitFormRequest = (data) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://donationbackendlb-1bjc8td-1643657227.us-east-1.elb.amazonaws.com/';
    axios.post(backendUrl + '/donation-offer/', data)
    .then(function (response) {
    document.dispatchEvent(donationSubmitted)
    // Redirect user to Thank You
  })
    .catch(function (error) {
    document.dispatchEvent(submissionError)
    // display form error
  });
}

export default {
  submitFormRequest
}
