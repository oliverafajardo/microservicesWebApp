import React from 'react';

const CommentList = ({ postId, comments = [] }) => {

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
    });
    
    console.log(`Rendering comments for post ${postId}:`, comments);
    
    return <ul>{renderedComments}</ul>;
};

export default CommentList;