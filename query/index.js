import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
        console.log('Post created in Query Service:', posts[id]);
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data; //added status
        const post = posts[postId];
        if (post) {
            post.comments.push({ id, content, status }); //added status
            console.log('Comment added to post in Query Service:', posts[postId]);
        } else {
            console.log(`Query Service: Post ${postId} not found, ignoring comment.`);
        }
    }

    if (type === 'CommentUpdated') {
        const { id, postId, status, content } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
        console.log('Comment updated in Query Service:', posts[postId]);
    }
}

//routehandler 
app.get('/posts', (req, res) => {
    res.send(posts);
});

// receives events from the event bus
// updates the posts for the query service
app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data); //this will update the posts for the query service

    res.send({});
});

app.listen(4002, async () =>  {
    console.log('Query Service Listening on 4002');

    const res = await axios.get('http://event-bus-srv:4005/events');

    for (let event of res.data) {
        console.log('Processing event:', event.type);

        handleEvent(event.type, event.data);
    }
});