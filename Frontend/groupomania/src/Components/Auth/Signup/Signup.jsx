import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../Config/routes';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';    
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../auth.css';

const validationShema = Yup.object().shape({
    pseudo: Yup.string().required('Pseudo requis').matches(/^[^\\\/&]+$/, "Script détecter"),
    email: Yup.string().required("Adresse email requis").email('Adresse email invalide').matches(/^[^\\\/&]*$/, "Script détecter"),
    password: Yup.string().required("Mot de passe requis").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Le mot de passe doit être composé d'aux moins 8 caractères dont 1 Maj, 1 Min et 1 chiffre")
});

const initialValue = {
    pseudo: "",
    email: "",
    password: ""
};

export default function Signup(props)
{
    // States
    const [typeInput, setTypeInput] = useState("password");
    
    const [errorServer, setErrorServer] = useState(null);

    // Affiche ou non le mot de passe en claire
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

    // Envoie les données du formulaire au serveur, si la réponse contient des erreurs retourner par le backend ces erreurs seront stockées dans un state puis affiché sur la page d'inscription au-dessus du formulaire
    const handleSubmit = (formData) =>
    {
        axios.post("http://localhost:3001/api/auth/signup", formData)
        .then(async (response) => 
        {
            setErrorServer(null);

            if (response.status === 201) 
            {
                const dataForLogin = {
                    email: formData.email,
                    password: formData.password
                }

                const reqLogin = await axios.post("http://localhost:3001/api/auth/login", dataForLogin);

                const dataUser = JSON.stringify(reqLogin.data.dataUser);
                sessionStorage.setItem('dataUser', dataUser);
                
                toast(`Bienvenu(e) ${formData.pseudo}`, {
                    autoClose: 5000,
                    position: 'top-left' 
                });

                // props.history.push(routes.SHOWALLPOST);
                window.location.href = "http://localhost:3000/posts"
            }
        })
        .catch(error => 
        {
            if (error.response)
            {
                if (error.response.data.error.original.code === "ER_DUP_ENTRY")
                {
                    const uniqueEmailMessage = 'Vous êtes déjà inscrit, veuillez vous connecter'
                    setErrorServer(uniqueEmailMessage);
                } 
            }
        });
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
                        
                            {errorServer != null && (
                                <div className="errorsServer">
                                    <p>{errorServer}</p>
                                    <Link to={routes.LOGIN}>Connexion</Link>
                                </div> 
                            )}

                            <div className="form_group">
                                <label htmlFor="pseudo">Pseudo</label>

                                <Field 
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    placeholder="prenom-2"
                                    className="input"
                                />

                                <ErrorMessage name="pseudo" component="span"/>
                            </div>

                            <div className="form_group">
                                <label htmlFor="email">Adresse email</label>

                                <Field 
                                    type="text"
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

                            <button type="submit" disabled={!formik.isValid}>inscription</button>
                        </Form>
                    )  
                }
            }

            </Formik>
        </div>
    );
}