import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());
const posts: any = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post("http://localhost:4005/events", {
        type: 'PostCreated',
        data: posts[id]
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log(`Event received: ${type} ${data}`);
    res.send();
});

app.listen(4000, () => {
    console.log('Listening on 4000');
})