import React, { FC, FormEvent, useState } from 'react';
import axios from 'axios';

const PostCreate: FC = () => {
    const [title, setTitle] = useState<string>();

    const onSubmit = async (e: FormEvent)  => {
        e.preventDefault();
        await axios.post('http://posts.com/posts/create', {
            title: title
        });
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate;