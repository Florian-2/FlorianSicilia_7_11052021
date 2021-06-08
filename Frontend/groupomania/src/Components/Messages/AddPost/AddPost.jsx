import React, { useState } from 'react'
import routes from '../../../Config/routes';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import './addPost.css';

const validationShema = Yup.object().shape({
    header: Yup.string().required('En-tête requis').max(250, 'Ce champ ne peut pas contenir plus de 250 caractères').matches(/^[^\\\/&]+$/, "Script détecter"),
    content: Yup.string().required('Message requis').max(20000, 'Ce champ ne peut pas contenir plus de 20 000 caractères').matches(/^[^\\\/&]+$/, "Script détecter")
});

const initialValue = {
    header: "",
    content: ""
};

const handleSubmit = (data) =>
{
    const token = JSON.parse(localStorage.getItem('token'));

    axios.post('http://localhost:3001/api/post/edit', data, { headers: { Authorization: `Bearer ${token}`} })
        .then(response => console.log(response))
        .catch(error => console.log(error.response))
}

export default function AddPost() 
{
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

                        <button type="submit">Envoyer</button>

                    </Form>
                )
            }

            </Formik>

        </div>
    );
}