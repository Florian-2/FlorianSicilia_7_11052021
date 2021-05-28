import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../singup.css';

const validationShema = Yup.object().shape({
    email: Yup.string().required("Adresse email requis").email("Adresse email invalide").matches(/^[^\\\/&]*$/, "Script détecter"),
    password: Yup.string().required("Mot de passe requis").matches(/^[^\\\/&]*$/, "Script détecter")
});

const initialValue = {
    email: "",
    password: ""
};

const handleSubmit = (formData) =>
{
    console.log(formData);
};

export default function Login()
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