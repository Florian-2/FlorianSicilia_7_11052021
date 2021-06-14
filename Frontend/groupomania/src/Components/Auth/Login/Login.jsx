import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import routes from '../../../Config/routes';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../auth.css';


const validationShema = Yup.object().shape({
    email: Yup.string().required("Adresse email requis").email("Adresse email invalide").matches(/^[^\\/&]*$/, "Script détecter"),
    password: Yup.string().required("Mot de passe requis").matches(/^[^\\/&]*$/, "Script détecter")
});

const initialValue = {
    email: "",
    password: ""
};

export default function Login(props)
{
    const [typeInput, setTypeInput] = useState("password");
    const [invalidForm, setInvalid] = useState(null);

    const showPassword = () =>
    {
        if (typeInput === "text") 
        {
            setTypeInput("password");
        }
        else
        {
            setTypeInput("text");
        }
    }

    const handleSubmit = (formData) =>
    {
        axios.post("http://localhost:3001/api/user/login", formData)
            .then(response => 
            {
                setInvalid(null);
                 
                const dataUser = JSON.stringify(response.data.dataUser);
                sessionStorage.setItem('dataUser', dataUser);

                toast(`ReBonjour !`, {
                    autoClose: 5000,
                    position: 'top-left' 
                });

                // props.history.push(routes.SHOWALLPOST);
			    // document.location.reload();
                window.location.href = "/posts"
                
            })
            .catch(error => 
            {
                if (error.response.data.message) 
                    setInvalid(error.response.data.message);
            })
    };

    return (
        <div className="containersignup">

            <div className="background"></div>

            <Formik
                initialValues={initialValue}
                validationSchema={validationShema}
                onSubmit={handleSubmit}
            >

            {
                (formik) => {

                    return (

                        <Form>

                            {invalidForm != null && (
                                <div className="errorsServer">
                                    <p>{invalidForm}</p>
                                    <Link to={routes.SIGNUP}>inscription</Link>
                                </div> 
                            )}
                    
                            <div className="form_group">
                                <label htmlFor="email">Adresse email</label>

                                <Field 
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="exemple@gmail.com"
                                    className="input"
                                />

                                <ErrorMessage name="email" component="span"/>
                            </div>

                            <div className="form_group">
                                <label htmlFor="password">Mot de passe</label>

                                <Field 
                                    type={typeInput}
                                    name="password"
                                    id="password"
                                    placeholder="8 caractères"
                                    className="input"
                                />

                                <ErrorMessage name="password" component="span"/>

                                {typeInput === "password" ? 
                                    <FontAwesomeIcon icon={faEye} className="showPassword" onClick={showPassword}></FontAwesomeIcon> 
                                    : <FontAwesomeIcon icon={faEyeSlash} className="showPassword" onClick={showPassword}></FontAwesomeIcon>
                                }
                            </div>

                            <button type="submit" disabled={!formik.isValid}>Connexion</button>
                        </Form>  
                    )
                }
            }

            </Formik>
        </div>
    );
}