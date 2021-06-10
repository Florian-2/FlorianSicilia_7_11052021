import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Formik, Form, Field} from 'formik';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './profil.css';

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

    const token = JSON.parse(sessionStorage.getItem('dataUser'));

    const userProfile = async () =>
    {
        const response = await axios.get("http://localhost:3001/api/auth/profile", { headers: { Authorization: `Bearer ${token.token}`} })
        
        const dataUser = {...response.data.dataUser};
        dataUser.user_email = maskEmail(dataUser.user_email);

        setUser(dataUser);
    }

    const uploadFile = (values) =>
    {
        console.log(values);

        const data = new FormData();
        data.append('photo', values.photo);

        axios.put('http://localhost:3001/api/auth/profile/photo', data, { headers: { Authorization: `Bearer ${token.token}`} })
        .then(response => console.log(response))
        .catch(err => console.log(err.response))
    }

    const handleDeleteUser = () =>
    {
        axios.delete("http://localhost:3001/api/auth/profile/delete", { headers: { Authorization: `Bearer ${token.token}`} })
        .then(response => {
            console.log(response)
            sessionStorage.clear();
            window.location.href = "http://localhost:3000/signup"
        })
        .catch(error => console.log(error.response))
    }

    return (
        <div className="container_profile">

            <div className="user">
                <div className="img_profile">
                    <img src={user.user_photo} width="200" alt="" />
                </div>


            <Formik
                initialValues={{photo: ""}}
                onSubmit={uploadFile}
            >

            {
                (formik) => {

                    return (
                            
                        <Form>
                        
                            <div className="form_group">
                                <label htmlFor="file">IMG</label>

                                <Field 
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={(e) => formik.setFieldValue('photo', e.target.files[0])}
                                />

                                <button type="submit">GO</button>
                            </div>

                        </Form>
                    )  
                }
            }

            </Formik>
                

            {/* <FontAwesomeIcon icon={faEdit} className="icon"/> */}

                <div className="info_user">
                    <p>{user.user_username}</p>
                    <p>{user.user_email}</p>
                </div>
            </div>

            <div className="remove_account">
                <button onClick={handleDeleteUser}>Supprimer  <FontAwesomeIcon icon={faTrash}/></button>
            </div>
            
        </div>
    );
}