import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './onePost.css'

export default function OnePost({message}) 
{
    return (
        <div className="post">

            <div className="username">
                <p>{message.User.user_username}</p>
                <span>Publié le {message.createdAt}</span>
            </div>

            <div className="content">
                <p>{message.message_title}</p>
                <p>{message.message_content}</p>
            </div>

            <div className="interaction">
                <div className="like">
                    <FontAwesomeIcon icon={faThumbsUp} className="icon_like"/>
                </div>

                <div className="trash">
                    <FontAwesomeIcon icon={faTrash} className="icon_trash"/>
                </div>

            </div>
        </div>
    );
}