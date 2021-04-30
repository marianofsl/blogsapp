import React, { FC, FormEvent, useState } from 'react';
import axios from 'axios';

interface CommentCreateProps {
    postId: string
}

const CommentCreate: FC<CommentCreateProps> = ({ postId }) => {
    const [content, setContent] = useState<string>();

    const onSubmit = async (e: FormEvent)  => {
        e.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        });
        setContent('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input onChange={e => setContent(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default CommentCreate;