import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

interface CommentListProps {
    comments: Array<any>
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
    const renderedComments = comments.map((comment: any) => {
        let content;

        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
        }

        if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
        }

        const { id } = comment;
        return <li key={id}>{content}</li>;
    });

    return <ul>
        {renderedComments}
    </ul>
}

export default CommentList;