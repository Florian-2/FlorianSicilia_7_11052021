// Librairies - CSS
import React, { useEffect, useState } from 'react'
import classes from './layout.module.css';
import axios from 'axios';

// Composants
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { UserContext } from '../Context/ContextDataUser'

import { ToastContainer } from 'react-toastify'; 

export default function Layout(props) 
{
	const [user, setUser] = useState({});

    useEffect(() => getAllPosts(), []);
    
    const getAllPosts = async () =>
    {
        const token = JSON.parse(localStorage.getItem('token'));
        
        const response = await axios.get("http://localhost:3001/api/auth/profile", { headers: { Authorization: `Bearer ${token}`} })
        setUser(response.data.dataUser);
        console.log(response.data.dataUser);
    }

    return (   
        <div className={classes.Layout}>
            <Header/>
            
            <UserContext.Provider value={user}>
                <main className={`container ${classes.content}`}>

                    {props.children}

                </main>
            </UserContext.Provider>
            
            <ToastContainer />
            
            <Footer />
            
        </div>
    );
}
