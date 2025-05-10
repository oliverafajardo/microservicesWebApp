import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json())
app.use(cors());

const events = []; //store all incoming events in array

app.post('/events', (req, res) =>  {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event).catch((err) =>  {
        console.log(err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
    });   
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err.message);
    });
    res.send({ status: 'OK' });

});

//if anyone wants to know what events have been sent, they can call this endpoint
app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Event Bus Listening on 4005');
});