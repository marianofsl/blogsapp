import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const posts: any = {};

const handleEvent = (type: any, data: any) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = {
            id,
            title,
            comments: []
        };
    }

    if (type === 'CommentCreated') {
        const { id, postId, content, status } = data;
        posts[postId] = {
            ...posts[postId],
            comments: [
                ...posts[postId].comments,
                { id, content, status }
            ]
        };
    }

    if (type === 'CommentUpdated') {
        const { id, postId, content, status } = data;
        const post = posts[postId];
        if (post) {
            const comment = post.comments.find((comment: any) => comment.id === id);

            if (comment) {
                comment.status = status;
                comment.content = content;
            }
        }
    }
}

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.status(201).send();
});

app.listen(4002, async () => {
    console.log('Listening on 4002');
    const res = await axios.get('http://eventbus-srv:4005/events');
    for (let event of res.data) {
        const { type, data } = event;
        console.log('Processing ', event.type);
        handleEvent(type, data);
    }
});