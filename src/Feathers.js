import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import agent from 'superagent';
import rest from 'feathers-rest/client';
import auth from 'feathers-authentication-client';
import { config } from './config';

const serverAddy = config.backendUrl;
const restful    = rest(serverAddy);

const client = feathers()
    .configure(hooks())
    .configure(restful.superagent(agent))
    .configure(auth({storage: window.localStorage}));

export default client;