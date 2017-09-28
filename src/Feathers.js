import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';

const serverAddy = process.env.REACT_APP_BACKEND_URL || 'http://donationbackendlb-1bjc8td-1643657227.us-east-1.elb.amazonaws.com';
const socket     = io(serverAddy);
const client     = feathers();

client.configure(hooks());
client.configure(socketio(socket, {timeout: 5000}));

export default client;