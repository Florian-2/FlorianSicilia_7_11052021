import React from 'react'
import routes from '../../../Config/routes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import './addPost.css';

const validationShema = Yup.object().shape({
    header: Yup.string().required('En-tête requis').max(250, 'Ce champ ne peut pas contenir plus de 250 caractères').matches(/^[^\\/&]+$/, "Script détecter"),
    content: Yup.string().required('Message requis').max(20000, 'Ce champ ne peut pas contenir plus de 20 000 caractères').matches(/^[^\\/&]+$/, "Script détecter")
});

export default function AddPost(props) 
{
    const initialValue = {
        header: props.location.state && props.location.state.post ? props.location.state.post.title : "",
        content: props.location.state && props.location.state.post ? props.location.state.post.message : "",
    };

    const handleSubmit = (data) =>
    {
        const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));

        if (props.location.state && props.location.state.post) 
        {
            axios.put(`http://localhost:3001/api/post/modify/${props.location.state.post.idPost}`, data, { headers: { Authorization: `Bearer ${dataUser.token}`} })
            .then(() => 
            {
                props.history.push(routes.SHOWALLPOST);

                toast(`Modifications enregistrées`, {
                    autoClose: 5000,
                    position: 'top-left' 
                });
            })
            .catch(error => console.log(error.response))        
        }
        else
        {
            axios.post('http://localhost:3001/api/post/edit', data, { headers: { Authorization: `Bearer ${dataUser.token}`} })
            .then(() => 
            {
                props.history.push(routes.SHOWALLPOST);

                toast(`Publication enregistrée`, {
                    autoClose: 5000,
                    position: 'top-left' 
                });
            })
            .catch(error => console.log(error.response))
        }
    } 

    return (
        <div className="container_message">

            <Formik
                initialValues={initialValue}
                validationSchema={validationShema}
                onSubmit={handleSubmit}
            >

            {
                (formik) => (

                    <Form>

                        <div className="form_group">
                            <label htmlFor="header">En-tête</label>

                            <Field 
                                type="text"
                                name="header"
                                id="header"
                                placeholder="En-tête de votre message"
                                className="input"
                            />

                            <ErrorMessage name="header" component="span"/>
                        </div>

                        <div className="form_group">
                            <label htmlFor="content">Message</label>

                            <Field 
                                type="textarea"
                                component="textarea"
                                name="content"
                                id="content"
                                placeholder="Message..."
                                className="textarea"
                            />

                            <ErrorMessage name="content" component="span"/>
                        </div>

                        <button type="submit" disabled={!formik.isValid}>
                            {props.location.state ? "Enregister les modification" : "Publié"}
                        </button>

                    </Form>
                )
            }

            </Formik>

        </div>
    );
}