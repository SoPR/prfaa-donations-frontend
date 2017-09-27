import axios from 'axios';

const donationSubmitted = new Event('donationSubmitted');
const submissionError = new Event('submissionError');

const submitFormRequest = (data) => {
    axios.post(process.env.REACT_APP_BACKEND_URL, data)
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
