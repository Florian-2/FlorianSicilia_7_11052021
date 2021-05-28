import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../singup.css';

const validationShema = Yup.object().shape({
    pseudo: Yup.string().required('Pseudo requis').matches(/^[^\\\/&]+$/, "Script détecter"),
    email: Yup.string().required("Adresse email requis").email("Adresse email invalide").matches(/^[^\\\/&]*$/, "Script détecter"),
    password: Yup.string().required("Mot de passe requis").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Le mot de passe doit être composé d'aux moins 8 caractères dont 1 Maj, 1 Min, 1 chiffre et 1 caractère spécial")
});

const initialValue = {
    pseudo: "",
    email: "",
    password: ""
};

const handleSubmit = (formData) =>
{
    console.log(formData);
};



export default function Singup()
{

    const [typeInput, setTypeInput] = useState("password");

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

    return (
        <div className="containerSingup">

            <div className="background"></div>

            <Formik
                initialValues={initialValue}
                validationSchema={validationShema}
                onSubmit={handleSubmit}
            >

            {
                (formik) => (

                    <Form>
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

                        <button type="submit">inscription</button>
                    </Form>  
                )
            }

            </Formik>
        </div>
    );
}