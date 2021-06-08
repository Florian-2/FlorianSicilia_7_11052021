import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';

import './containerPost.css';
import OnePost from './OnePost/OnePost';
import Spinner from '../../UI/Spinner/Spinner';

import { UserContext } from '../../Context/ContextDataUser';

export default function ShowPosts() 
{
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => getAllPosts(), []);
    
    const getAllPosts = async () =>
    {
        const token = JSON.parse(localStorage.getItem('token'));
        
        const response = await axios.get("http://localhost:3001/api/post/showAllPosts", { headers: { Authorization: `Bearer ${token}`} })
        setAllPost(response.data.allPosts);
        setLoading(false);
    }

    // CONTEXT
    const context = useContext(UserContext)


    const onePost = allPost.map((post, index) => 
    {
        return (
            <OnePost
                key={index}
                message={post}
            />
        )
    });

    return (
        <div className="container_posts">
            {!loading ? onePost : <Spinner/> }
        </div>
    );
}
