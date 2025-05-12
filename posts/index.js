import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

//where we will store our posts
const posts = {};

//route handlers
app.get('/posts', (req, res) => {
    res.send(posts)
});

// Handles POST requests to /posts.
// Generates an ID, stores the new post, emits a 'PostCreated' event,
// and sends the created post back in the response.
app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex'); //k5hdhdhdwhwh
    const { title } = req.body; //grab the title from the request body

    posts[id] = {
        id,
        title
    };

    //send a message to the event bus to let it know that a post was created
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    res.status(201).send(posts[id]); //let user know that the post was created
});

// receives events from the event bus
app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('v55');
    console.log('Posts Service Listening on 4000');
});
