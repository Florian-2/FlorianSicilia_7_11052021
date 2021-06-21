import React, { useEffect, useState } from 'react'
import axios from '../../../Config/axios';

import OnePost from './OnePost/OnePost';
import Spinner from '../../UI/Spinner/Spinner';
import './containerPost.css';

export default function ShowPosts() 
{
    // States
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);

    // Variable
    const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));

    // Fonctions
    useEffect(() => {
        getAllPosts()
    }, []);
    
    const getAllPosts = async () =>
    {
        const response = await axios.get("/post/showAllPosts", { headers: { Authorization: `Bearer ${dataUser.token}`} })
        setAllPost(response.data.allPosts);
        setLoading(false);
    }

    const handleDeletePost = (idPost) =>
    {
        axios.delete(`/post/delete/${idPost}`, { headers: { Authorization: `Bearer ${dataUser.token}`} })
        .then(() => getAllPosts())
        .catch(error => console.log(error.response))
    }

    // Génère une carte pour chaque publications
    const onePost = allPost.map((post) => 
    {
        return (
            <OnePost
                key={post.id}
                content={post}
                authorization={post.UserId}
                postId={post.id}
                remove={() => handleDeletePost(post.id)}
            />
        )
    });

    return (
        <div className="container_posts">
            {!loading ? onePost : <Spinner/>}
        </div>
    );
}
