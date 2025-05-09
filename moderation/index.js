const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// this service is responsible for watching events
//one route to handle all events

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }
    res.send({});
});

app.listen(4003, () => {
    console.log('moderation service running on port 4003');
});


