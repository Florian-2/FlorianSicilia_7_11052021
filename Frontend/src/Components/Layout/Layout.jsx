// Librairies - CSS
import React from 'react'
import classes from './layout.module.css';

// Composants
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { ToastContainer } from 'react-toastify'; 

export default function Layout(props) 
{
    return (   
        <div className={classes.Layout}>
            <Header/>

            <main className={`container ${classes.content}`}>

                {props.children}

            </main>
            
            <ToastContainer />
            
            <Footer />
            
        </div>
    );
}
