import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());
const commentsByPostId: any = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comment = { id: commentId, content, status: 'pending' };

    commentsByPostId[postId] = [...commentsByPostId[postId] || [], comment];

    await axios.post("http://localhost:4005/events", {
        type: 'CommentCreated',
        data: {
            ...comment,
            postId
        }
    });

    res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log(`Event received: ${type} ${data}`);

    if (type === 'CommentModerated') {
        const { id, postId, content, status } = data;

        const comments: Array<any> = commentsByPostId[postId] || [];
        const comment = comments.find((value) => value.id === id);
        if (comment) {
            comment.status = status;
        }

        await axios.post("http://localhost:4005/events", {
            type: 'CommentUpdated',
            data: {
                ...comment,
                postId
            }
        });

    }
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});