import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log(`Event received: ${type} ${data}`);

    if (type === 'CommentCreated') {
        const { id, postId, content } = data;
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post("http://eventbus-srv:4005/events", {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        });
    }
});

app.listen(4003, () => {
    console.log('Listening on 4003');
});