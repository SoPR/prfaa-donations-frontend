import client from '../../Feathers';

const donationSubmitted = new Event('donationSubmitted');
const submissionError = new Event('submissionError');

const submitFormRequest = (data) => {
    const donationOfferService = client.service('donation-offer');
    donationOfferService.create(data)
        .then((res) => {
    document.dispatchEvent(donationSubmitted)
    // Redirect user to Thank You
  })
        .catch((error) => {
    document.dispatchEvent(submissionError)
    // display form error
  });
}

export default {
  submitFormRequest
}
