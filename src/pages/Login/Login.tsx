import styles from './Login.module.css';
import React, {useEffect, useState} from "react";
import {IonContent, useIonRouter} from "@ionic/react";

import {validateToken} from "../../services/AuthService";
import {register, login} from "../../services/AuthService";
import nabpIcon from "../../assets/icons/nabp.svg";

/**
 * Home page
 * @returns {JSX.Element}
 * This page is the home page of the application.
 * It displays the groups the user is a member of.
 **/
const Login: React.FC = (): JSX.Element => {
    const router = useIonRouter();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formType, setFormType] = useState("login");
    const [formData, setFormData] = useState({email: "", username: "", password: "", repeatPassword: ""});

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        validateToken().then(r => {
            r ? router.push('/home') : null;
        });
    }, []);

    useEffect(() => {
        validateFormCompletion() ? setIsFormValid(true) : setIsFormValid(false);
    }, [formData, formType]);

    /**
     * This function handles the change of the input fields
     * @param event - The event of the input field
     */
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    }

    /**
     * This function handles the submit of the form
     * @param event - The event of the form
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        if (formType === 'register') {
            const email = formData.get('email') as string;
            const repeatPassword = formData.get('repeatPassword') as string;
            const dataValidation = validateFormData(username, password, email, repeatPassword);
            const isValid = showErrorMessage(dataValidation);
            if (isValid) {
                register(email, username, password).then(r => {
                    handleResponse(r);
                });
            }
        } else {
            const dataValidation = validateFormData(username, password);
            const isValid = showErrorMessage(dataValidation);
            if (isValid) {
                login(username, password).then(r => {
                    handleResponse(r);
                });
            }
        }
    }

    /**
     * This function handles the response of the server
     * @param r - The response of the server
     */
    const handleResponse = (r: any) => {
        if (r.error) {
            setError(r.error);
            console.error(r.error);
        } else {
            localStorage.setItem('token', r.token);
            localStorage.setItem('username', r.username);
            localStorage.setItem('nickname', r.nickname);
            localStorage.setItem('userRole', r.userRole);
            router.push('/home');
        }
    }

    /**
     * This function shows the error message of the input fields
     * @param dataValidation - The validation of the input fields
     */
    const showErrorMessage = (dataValidation: { id: string, valid: boolean, message: string }[]) => {
        let isValid = true;
        dataValidation.forEach((validation: { id: string, valid: boolean, message: string }) => {
            if (!validation['valid']) {
                switch (validation['id']) {
                    case 'email':
                        setEmailError(validation['message']);
                        break;
                    case 'username':
                        setUsernameError(validation['message']);
                        break;
                    case 'password':
                        setPasswordError(validation['message']);
                        break;
                    case 'repeatPassword':
                        setRepeatPasswordError(validation['message']);
                        break;
                }
                isValid = false;
            } else {
                switch (validation['id']) {
                    case 'email':
                        setEmailError('');
                        break;
                    case 'username':
                        setUsernameError('');
                        break;
                    case 'password':
                        setPasswordError('');
                        break;
                    case 'repeatPassword':
                        setRepeatPasswordError('');
                        break;
                }
            }
        });
        return isValid;
    }

    /**
     * This function validates the form data
     * @param username - The username of the user
     * @param password - The password of the user
     * @param email - The email of the user
     * @param repeatPassword - The repeated password of the user
     * @returns The validation of the form data
     */
    const validateFormData = (username: string, password: string, email?: string, repeatPassword?: string) => {
        //TODO should be implemented in a more advanced way
        let dataValidation: { id: string, valid: boolean, message: string }[] = [];
        if (username.length < 3) {
            dataValidation.push({id: 'username', valid: false, message: 'Username is not valid'});
        } else {
            dataValidation.push({id: 'username', valid: true, message: ''});
        }
        if (password.length < 8) {
            dataValidation.push({id: 'password', valid: false, message: 'Password is not secure enough'});
        } else {
            dataValidation.push({id: 'password', valid: true, message: ''});
        }
        if (email && email.length < 3) {
            dataValidation.push({id: 'email', valid: false, message: 'Email is not valid'});
        } else {
            dataValidation.push({id: 'email', valid: true, message: ''});
        }
        if (repeatPassword && password !== repeatPassword) {
            dataValidation.push({id: 'repeatPassword', valid: false, message: 'Passwords must match'});
        } else {
            dataValidation.push({id: 'repeatPassword', valid: true, message: ''});
        }
        return dataValidation;
    }

    /**
     * This function validates the completion of the form
     * @returns The validation of the form completion
     */
    const validateFormCompletion = () => {
        //TODO should be implemented in a more advanced way
        if (formType === 'register') {
            return formData.email.length > 0 && formData.username.length > 0 && formData.password.length > 0 && formData.repeatPassword.length > 0;
        } else {
            return formData.username.length > 0 && formData.password.length > 0;
        }
    }

    return (
        <IonContent>
            <div className="background">
                <div className={styles.loginContainer}>
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src={nabpIcon} alt="nabp-icon"/>
                        <h3>Your smart note-taking app</h3>
                    </div>
                    <h1 className={styles.loginTitle}>
                        {formType === 'login' ? 'Login'
                            : formType === 'register' ? 'Register'
                                : null}
                    </h1>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        {formType === 'register' ? <div className={styles.loginInputContainer}>
                                <div className={styles.labelContainer}>
                                    <label className={styles.loginLabel} htmlFor="email">Email</label>
                                    {emailError ? <p className={styles.errorLabel}>{emailError}</p> : null}
                                </div>
                                <input className={styles.loginInput} type="email" id="email" name="email"
                                       onChange={handleChange} value={formData.email} required/>
                            </div>
                            : null}
                        <div className={styles.loginInputContainer}>
                            <div className={styles.labelContainer}>
                                <label className={styles.loginLabel} htmlFor="username">
                                    {formType === 'login' ? 'Email / Username'
                                        : formType === 'register' ? 'Username'
                                            : null}
                                </label>
                                {usernameError ? <p className={styles.errorLabel}>{usernameError}</p> : null}
                            </div>
                            <input className={styles.loginInput} type="text" id="username" name="username"
                                   onChange={handleChange} value={formData.username} required/>
                        </div>
                        <div className={formType === 'login' ? styles.lastInputContainer
                            : formType === 'register' ? styles.loginInputContainer
                                : ''}>
                            <div className={styles.labelContainer}>
                                <label className={styles.loginLabel} htmlFor="password">Password</label>
                                {passwordError ? <p className={styles.errorLabel}>{passwordError}</p> : null}
                            </div>
                            <input className={styles.loginInput} type="password" id="password" name="password"
                                   onChange={handleChange} value={formData.password} required/>
                        </div>
                        {formType === 'register' ? <div className={styles.lastInputContainer}>
                                <div className={styles.labelContainer}>
                                    <label className={styles.loginLabel} htmlFor="repeatPassword">Repeat Password</label>
                                    {repeatPasswordError ?
                                        <p className={styles.errorLabel}>{repeatPasswordError}</p> : null}
                                </div>
                                <input className={styles.loginInput} type="password" id="repeatPassword"
                                       name="repeatPassword"
                                       onChange={handleChange} value={formData.repeatPassword} required/>
                            </div>
                            : null}
                        <div className={styles.loginRegisterToggleContainer}>
                            <p className={styles.loginRegisterToggle}
                               onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}>
                                {formType === 'login' ? 'not registered yet?'
                                    : formType === 'register' ? 'already have an account?'
                                        : null}
                            </p>
                        </div>
                        <div className={styles.loginButtonContainer}>
                            <button
                                className={styles.loginButton}
                                type="submit"
                                disabled={!isFormValid}>
                                {formType === 'login' ? 'Login'
                                    : formType === 'register' ? 'Register'
                                        : null}
                            </button>
                        </div>
                        {error ? <div className={styles.errorContainer}>
                                <p className={styles.errorText}>{error}</p>
                            </div>
                            : null}
                    </form>
                </div>
            </div>
        </IonContent>
    );
};

export default Login;
