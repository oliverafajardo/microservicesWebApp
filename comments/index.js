import express from 'express'; //create a server
import bodyParser from 'body-parser'; //parse the body of the request
import { randomBytes } from 'crypto'; //generate random id for the comment
import cors from 'cors';
import axios from 'axios'; // Import axios

const app = express(); //create a server
app.use(bodyParser.json()); //parse the body of the request
app.use(cors());

const commentsByPostId = {};


app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []); //send the comments for the post
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || []; // this is the array of comments for the post
    comments.push({ id: commentId, content, status: 'pending' }) //
    commentsByPostId[req.params.id] = comments;
    
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(201).send(comments);
});

// receives events from the event bus
// updates the comments for the post
app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        });
    }
    res.send({});
});

console.log('comments service');

app.listen(4001, () => {
    console.log('Comments Service Listening on 4001');
});
