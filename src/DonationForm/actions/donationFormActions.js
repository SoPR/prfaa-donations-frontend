import axios from 'axios';

const submitFormRequest = (data) => {
  axios.post('/endpoint', data)
  .then(function (response) {
    console.log(response);
    // Redirect user
  })
  .catch(function (error) {
    console.log(error);
    // display form error
  });
}

export default {
  submitFormRequest
}
