import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';

const socket = io(process.env.REACT_APP_BACKEND_URL);
const client = feathers();

client.configure(hooks());
client.configure(socketio(socket, {timeout: 5000}));

export default client;