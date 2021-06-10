import React, { useEffect, useState } from 'react'
import axios from 'axios';

import './containerPost.css';
import OnePost from './OnePost/OnePost';
import Spinner from '../../UI/Spinner/Spinner';

export default function ShowPosts() 
{
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);

    const admin = JSON.parse(sessionStorage.getItem('dataUser'));
   
    useEffect(() => getAllPosts(), []);
    
    const getAllPosts = async () =>
    {
        const token = JSON.parse(sessionStorage.getItem('dataUser'));
        
        const response = await axios.get("http://localhost:3001/api/post/showAllPosts", { headers: { Authorization: `Bearer ${token.token}`} })
        setAllPost(response.data.allPosts);
        setLoading(false);
    }

    // const handleDeletePost = () =>
    // {
        
    // }

    const onePost = allPost.map((post, index) => 
    {
        return (
            <OnePost
                key={index}
                message={post}
                // delete={}
            />
        )
    });

    return (
        <div className="container_posts">
            {!loading ? onePost : <Spinner/> }
            {admin === 1 ? <button>Admin</button> : null}
        </div>
    );
}
