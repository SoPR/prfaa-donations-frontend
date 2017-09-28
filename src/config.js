export default class config {
    static get backendUrl() {
        return process.env.REACT_APP_BACKEND_URL || 'http://donationbackendlb-1bjc8td-1643657227.us-east-1.elb.amazonaws.com';
    }
}