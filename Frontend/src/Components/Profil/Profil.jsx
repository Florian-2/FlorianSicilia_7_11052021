import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './profil.css';

// Masquer tous les caractères qui viennent avant le "@"
const maskEmail = (email) =>
{
    let email1 = email.split('@')[0].split('');
    let email2 = email.split('@')[1].split('');

    for (let i = 0; i < email1.length; i++)
    {
        email1[i] = "*";
    }

    return `${email1.join('')}@${email2.join('')}`;
}

export default function Profil() 
{
	const [user, setUser] = useState({});

    useEffect(() => userProfile(), []);

    const dataSessionUser = JSON.parse(sessionStorage.getItem('dataUser'));

    // Récupère les infos de l'utilisateur
    const userProfile = async () =>
    {
        const response = await axios.get("http://localhost:3001/api/user/profile", { headers: { Authorization: `Bearer ${dataSessionUser.token}`} })
        
        const dataUser = {...response.data.dataUser};
        dataUser.user_email = maskEmail(dataUser.user_email);
        dataUser.createdAt = dataUser.createdAt.split(' ')[0]

        setUser(dataUser);
    }

    // Supprimer le compte
    const handleDeleteUser = () =>
    {
        axios.delete("http://localhost:3001/api/user/profile/delete", { headers: { Authorization: `Bearer ${dataSessionUser.token}`} })
        .then(response => {
            sessionStorage.clear();
            window.location.href = "/signup";
        })
        .catch(error => console.log(error.response))
    }

    return (
        <div className="container_profile">

            <div className="user">
                <div className="info_user">
                    <p>Pseudo: {user.user_username}</p>
                    <p>Adresse mail: {user.user_email}</p>
                    <p>Compte créé le {user.createdAt}</p>
                    {dataSessionUser.isAdmin === 1 && <p>Rôle : Administrateur</p>}
                </div>
            </div>

            <div className="remove_account">
                <button onClick={handleDeleteUser} title="Supprimer votre compte">Supprimer <FontAwesomeIcon icon={faTrash}/></button>
            </div>
            
        </div>
    );
}