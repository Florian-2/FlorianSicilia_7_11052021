// Librairies - CSS
import React, { useState, useEffect } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import routes from '../../../Config/routes';
import classes from '../header.module.css';

function Navigation(props)
{
    const [connected, setConnected] = useState();

	useEffect(() =>
	{
		if (sessionStorage.getItem('dataUser')) 
			setConnected(true);
        else
            setConnected(false);
	}, [])

    const logout = () =>
    {
        // props.history.push(routes.SIGNUP);
        sessionStorage.clear();
        window.location.href = "/signup";
    }

    return (
        <ul className={classes.Navigation}>
            {connected && (
                <li className={classes.NavigationItem}>
                    <NavLink exact to={routes.SHOWALLPOST} activeClassName={classes.active}>Voir les posts</NavLink>
                </li>
            )}

            {connected && (
                <li className={classes.NavigationItem}>
                    <NavLink exact to={routes.ADDPOST} activeClassName={classes.active}>Ajouter un posts</NavLink>
                </li>
            )}

            {connected && (
                <li className={classes.NavigationItem}>
                    <NavLink exact to={routes.PROFIL} activeClassName={classes.active}>Profil</NavLink>
                </li> 
            )}

            {!connected && (
                <li className={classes.NavigationItem}>
                    <NavLink exact to={routes.SIGNUP} activeClassName={classes.active}>Inscription</NavLink>
                </li> 
            )}

            {!connected && (
                <li className={classes.NavigationItem}>
                    <NavLink exact to={routes.LOGIN} activeClassName={classes.active}>Connexion</NavLink>
                </li>
            )}

            {connected && <button className={classes.logout} onClick={logout}>Déconnexion</button>}

        </ul>
    );
}

export default withRouter(Navigation);