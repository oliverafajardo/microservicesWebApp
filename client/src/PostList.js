import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://posts.com/posts');
            setPosts(res.data);
        } catch (err) {
            console.error('Failed to fetch posts:', err.message);
            setPosts({}); // Optionally set to empty, or keep previous state
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(posts);
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
            className="card" 
            style={{ width: '30%', marginBottom: '20px' }} 
            key={post.id}
            >
    
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

export default PostList;


