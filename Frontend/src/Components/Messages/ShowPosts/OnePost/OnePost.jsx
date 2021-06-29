import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import routes from '../../../../Config/routes';
import axios from '../../../../Config/axios';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';    
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './onePost.css'

const validationShema = Yup.object().shape({
    comment: Yup.string().required('Champ commentaire vide').matches(/^[^\\/&]+$/, "Script détecter"),
})

const initialValue = {
    comment: ""
}

export default function OnePost(props) 
{
    // State
    const [comment, setComment] = useState([]);

    // Variables
    const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));
    const [date, time] = props.content.createdAt.split(' ');
    const listCommentApi = [...props.content.Comments].reverse();

    /* Fonction
        Ajout d'un commentaire sous une publication
    */
    const handleSumbit = (value, propsSubmit) =>
    {
        const copyComment = [...comment];
        copyComment.push({content: value.comment, postId: props.postId, username: dataUser.username})

        const lastComment = copyComment[copyComment.length - 1];
        
        setComment(copyComment)
        propsSubmit.resetForm();
        
        axios.post("/post/edit/comment", lastComment, { headers: { Authorization: `Bearer ${dataUser.token}`} })
        .then(response => console.log(response))
        .catch(error => console.log(error.response))
    }

    return (
        <div className="post" >

            <div className="username">
                <p>{props.content.User.user_username}</p>
                <span>Publié le {date} à {time}</span>
            </div>

            <div className="content">
                <p>{props.content.message_title}</p>
                <p>{props.content.message_content}</p>
            </div>

          {/* Autorisation de supprimer ou modifier le post si l'utilisateur est à l'origine du post OU si il est administrateur */}
          {props.authorization === dataUser.userId || dataUser.isAdmin === 1 ? (
            <div className="interaction" >
                <div className="trash" onClick={props.remove} title="Supprimer cette publication">
                    <FontAwesomeIcon  icon={faTrash} className="icon_trash" />
                </div>
                <div className="edit" title="Modifier cette publication">
                    <Link aria-label="modifier cette publication" 
                        to={{
                            pathname: routes.ADDPOST,
                            state: { 
                                post: {
                                    idPost: props.postId,
                                    title: props.content.message_title,
                                    message: props.content.message_content
                                }
                            }
                    }}><FontAwesomeIcon icon={faEdit} className="icon_edit" /></Link>
                </div>                
            </div>              
          ) : null}

            <div className="container_comment">
                
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationShema}
                    onSubmit={handleSumbit}
                >

                {
                    (formik) => {
                    
                        return (
                            <Form>

                                <Field
                                    type="text"  
                                    name="comment"
                                    placeholder="Commentaire..."
                                />

                                <ErrorMessage name="comment" component="span" />

                            </Form>
                        )
                    }
                }

                </Formik>

                {listCommentApi.map((element, index) => 
                {
                    return (
                        <div key={index} className="comment">
                            <p>{element.comment_username}</p>
                            <p>{element.comment_content}</p>
                        </div>
                    )
                })}
                
                {comment.map((element, index) => 
                {
                    return (
                        <div key={index} className="comment">
                            <p>{dataUser.username}</p>
                            <p>{element.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}