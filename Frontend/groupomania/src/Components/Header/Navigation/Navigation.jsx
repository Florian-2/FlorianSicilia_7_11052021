// Librairies - CSS
import React from 'react'
import { NavLink } from 'react-router-dom';
import routes from '../../../Config/routes';
import classes from '../header.module.css';

export default function Navigation()
{
    return (
        <ul className={classes.Navigation}>
            <li className={classes.NavigationItem}>
                <NavLink exact to={routes.SHOWALLPOST} activeClassName={classes.active}>Voir les postes</NavLink>
            </li>

            <li className={classes.NavigationItem}>
                <NavLink exact to={routes.ADDPOST} activeClassName={classes.active}>Ajouter un poste</NavLink>
            </li>

            <li className={classes.NavigationItem}>
                <NavLink exact to={routes.PROFIL} activeClassName={classes.active}>Profil</NavLink>
            </li>

            <li className={classes.NavigationItem}>
                <NavLink exact to={routes.SINGUP} activeClassName={classes.active}>Inscription</NavLink>
            </li>

            <li className={classes.NavigationItem}>
                <NavLink exact to={routes.LOGIN} activeClassName={classes.active}>Connexion</NavLink>
            </li>
        </ul>
    );
}