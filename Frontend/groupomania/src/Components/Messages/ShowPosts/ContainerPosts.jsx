import React, { useEffect, useState } from 'react'
import axios from 'axios';

import './containerPost.css';
import OnePost from './OnePost/OnePost';
import Spinner from '../../UI/Spinner/Spinner';

export default function ShowPosts() 
{
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);

    const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));

    useEffect(() => getAllPosts(), []);
    
    const getAllPosts = async () =>
    {
        const response = await axios.get("http://localhost:3001/api/post/showAllPosts", { headers: { Authorization: `Bearer ${dataUser.token}`} })
        setAllPost(response.data.allPosts);
        setLoading(false);
    }

    const handleDeletePost = (idPost) =>
    {
        axios.delete(`http://localhost:3001/api/post/delete/${idPost}`, { headers: { Authorization: `Bearer ${dataUser.token}`} })
        .then(() => getAllPosts())
        .catch(error => console.log(error.response))
    }

    const handleUpdatePost = (idPost) =>
    {
        axios.put(`http://localhost:3001/api/post/modify/${idPost}`, test, { headers: { Authorization: `Bearer ${dataUser.token}`} })
        .then(response => console.log(response))
        .catch(error => console.log(error.response))
    }

    const onePost = allPost.map((post) => 
    {
        return (
            <OnePost
                key={post.id}
                content={post}
                authorization={post.UserId}
                remove={() => handleDeletePost(post.id)}
                updateId={post.id}
                update={() => handleUpdatePost(post.id)}
            />
        )
    });

    return (
        <div className="container_posts">
            {!loading ? onePost : <Spinner/>}
        </div>
    );
}
