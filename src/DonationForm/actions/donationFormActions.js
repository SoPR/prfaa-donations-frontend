import axios from 'axios';

const donationSubmitted = new Event('donationSubmitted');
const submissionError = new Event('submissionError');

const submitFormRequest = (data) => {
    axios.post('http://donationbackendlb-1bjc8td-1643657227.us-east-1.elb.amazonaws.com/donation-offer', data)
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
