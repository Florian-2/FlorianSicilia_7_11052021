// Librairies - CSS
import React, { useState, useEffect } from 'react'
import classes from './header.module.css';
import Logo from './Logo';

// Composants
import Navigation from './Navigation/Navigation';

export default function Header()
{
    const [toggleMenu, setToggleMenu] = useState(false);
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);

    const toggleNavbar = () =>
    {
        setToggleMenu(!toggleMenu);
    }

    const changeWidthWindow = () =>
    {
        setWidthWindow(window.innerWidth);
    }

    useEffect(() => 
    {
        window.addEventListener("resize", changeWidthWindow);
    
        return () => window.removeEventListener("resize", changeWidthWindow);

    }, [])

    return (
        <header className={classes.Header}>
            <div className={classes.logo}>
                <Logo className={classes.Logo}/>
            </div>

            <div onClick={toggleNavbar} className={`${classes.hamburger} ${toggleMenu ? classes.active : ""}`}>
                <div className={classes.ligne1}></div>
                <div className={classes.ligne2}></div>
                <div className={classes.ligne3}></div>
            </div>

            <nav className={toggleMenu ? classes.active : ""}>
                {(toggleMenu || widthWindow > 750) && <Navigation />}
            </nav>
        </header>
    );
}