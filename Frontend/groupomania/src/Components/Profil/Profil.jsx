import React, { useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './profil.css';

import { UserContext } from '../Context/ContextDataUser';


export default function Profil() 
{
    const context = useContext(UserContext);

    return (
        <div className="container_profile">

            <div className="user">
                <div className="img_profile">
                    <img src="" alt="Photo utilisateur" />
                </div>
                <FontAwesomeIcon icon={faEdit} className="icon"/>

                <div className="info_user">
                    {context.user_username}
                </div>
            </div>

            <div className="remove_account">
                <button>Supprimer  <FontAwesomeIcon icon={faTrash}/></button>
            </div>
            
        </div>
    );
}