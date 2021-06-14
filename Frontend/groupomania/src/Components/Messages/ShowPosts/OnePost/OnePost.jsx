import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import routes from '../../../../Config/routes';
import axios from 'axios';
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
    const [comment, setComment] = useState([]);

    const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));

    const handleSumbit = (value, props) =>
    {
        setComment(prevState => [...prevState, {content: value.comment}])
        props.resetForm()

        axios.post("http://localhost:3001/api/post/edit/comment", comment, { headers: { Authorization: `Bearer ${dataUser.token}`} })
        .then(response => console.log(response))
        .catch(error => console.log(error.response))
    }

    // useEffect(() =>
    // {
    //     console.log(comment);
        
    // }, [comment])

    const [date, time] = props.content.createdAt.split(' ');
    
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

          {props.authorization === dataUser.userId || dataUser.isAdmin === 1 ? (
            <div className="interaction" >
                <div className="trash" onClick={props.remove} title="Supprimer cette publication">
                    <FontAwesomeIcon  icon={faTrash} className="icon_trash" />
                </div>
                <div className="edit" title="Modifier cette publication">
                    <Link to={{
                        pathname: routes.ADDPOST,
                        state: { 
                            post: {
                                idPost: props.updateId,
                                title: props.content.message_title,
                                message: props.content.message_content
                            }
                        }
                    }}><FontAwesomeIcon  icon={faEdit} className="icon_edit" /></Link>
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

                {comment.map((element, index) => 
                {
                    return (
                        <div key={index} className="comment">
                            <p>Florian</p>
                            <p>{element.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}