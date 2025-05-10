import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

//routehandler 
app.get('/posts', (req, res) => {
    res.send(posts);
});

// receives events from the event bus
// updates the posts for the query service
app.post('/events', (req, res) => {
    const { type, data } = req.body;

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

    console.log("Processed Event:", type);
    res.send({});
});

app.listen(4002, () => {
    console.log('Query Service Listening on 4002');
});