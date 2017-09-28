import feathers from 'feathers/client';
import hooks from 'feathers-hooks';

//import io from 'socket.io-client';
import agent from 'superagent';

//import socketio from 'feathers-socketio/client';
import rest from 'feathers-rest/client';

import config from './config';

const serverAddy = config.backendUrl;
const restful    = rest(serverAddy);
//const socket     = io(serverAddy);

//const client = feathers()
//    .configure(hooks())
//    .configure(socketio(socket, {timeout: 5000}));

const client = feathers()
    .configure(hooks())
    .configure(restful.superagent(agent));

export default client;