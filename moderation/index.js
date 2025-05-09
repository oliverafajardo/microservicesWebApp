const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// this service is responsible for watching events
//one route to handle all events

const app = express();
app.use(bodyParser.json());


app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const { postId, id, content } = data;
    }
});

app.listen(4003, () => {
    console.log('moderation service running on port 4003');
});


