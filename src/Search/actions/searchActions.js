import client from '../../Feathers';

const donationAccepted     = new Event('donationAccepted');
const donationAcceptFailed = new Event('donationAcceptFailed');

const acceptDonation = (data) => {
    const donationOfferService = client.service('donation-offer');

    if (data.id && data.acceptedBy) {
        return donationOfferService.patch(data.id, data)
            .then((res) => {
                document.dispatchEvent(donationAccepted)
            })
            .catch((err) => {
                document.dispatchEvent(donationAcceptFailed)
            });
    }
    else {
        return document.dispatchEvent(donationAcceptFailed);
    }
}

export default {
    acceptDonation
}
