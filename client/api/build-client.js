import axios from 'axios';

export default ({ req }) => {
    if (typeof window === 'undefined') {
        //we are on the server
       //create preconfigured axios instance
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        //we are on the client/browser
        return axios.create({
            baseURL: '/'
        });
    }
}