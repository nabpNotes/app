import styles from './Login.module.css';
import React, {useEffect, useState} from "react";
import {useIonRouter} from "@ionic/react";

import {validateToken} from "../../services/AuthService";
import nabpIcon from "../../assets/icons/nabp.svg";
import {register, login} from "../../services/AuthService";

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

    useEffect(() => {
        validateToken().then(r => {
            r ? router.push('/home') : null;
        });
    }, []);

    useEffect(() => {
        validateFormCompletion() ? setIsFormValid(true) : setIsFormValid(false);
    }, [formData, formType]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username =  formData.get('username') as string;
        const password = formData.get('password') as string;
        validateLoginFormData(username, password);
        if (formType === 'register') {
            const email = formData.get('email') as string;
            const repeatPassword = formData.get('repeatPassword') as string;
            const dataValidation = validateRegisterFormData(username, email, password, repeatPassword);
            let valid = true;
            dataValidation.forEach((validation: {id: string, valid: boolean, message: string}) => {
                if (!validation['valid']) {
                    valid = false;
                }
            });
            if (valid) {
                register(email, username, password).then(r => {
                    if (r.error) {
                        console.error(r.error); //TODO implement error handling
                    } else {
                        localStorage.setItem('token', r.token);
                        localStorage.setItem('username', r.username);
                        localStorage.setItem('nickname', r.nickname);
                        localStorage.setItem('userRole', r.userRole);
                        router.push('/home');
                    }
                });
            } else {
                //TODO implement error handling
            }
        } else {
            const dataValidation = validateLoginFormData(username, password);
            let valid = true;
            dataValidation.forEach((validation: {id: string, valid: boolean, message: string}) => {
                if (!validation['valid']) {
                    valid = false;
                }
            });
            if (valid) {
                login(username, password).then(r => {
                    if (r.error) {
                        console.error(r.error); //TODO implement error handling
                    } else {
                        localStorage.setItem('token', r.token);
                        localStorage.setItem('username', r.username);
                        localStorage.setItem('nickname', r.nickname);
                        localStorage.setItem('userRole', r.userRole);
                        router.push('/home');
                    }
                });
            } else {
                //TODO implement error
            }
        }
    }

    const validateLoginFormData = (username: string, password: string ) => {
        //TODO should be implemented in a more advanced way
        let dataValidation:{id: string, valid: boolean, message: string}[] = [];
        if (username.length < 3) {
            dataValidation.push({id: 'username', valid: false, message: 'Username must be at least 3 characters long'});
        }
        if (password.length < 8) {
            dataValidation.push({id: 'password', valid: false, message: 'Password must be at least 8 characters long'});
        }
        return dataValidation;
    }

    const validateRegisterFormData = (email: string, username: string, password: string, repeatPassword: string) => {
        //TODO should be implemented in a more advanced way
        let dataValidation:{id: string, valid: boolean, message: string}[] = [];
        if (email.length < 3) {
            dataValidation.push({id: 'email', valid: false, message: 'Email must be at least 3 characters long'});
        }
        if (username.length < 3) {
            dataValidation.push({id: 'username', valid: false, message: 'Username must be at least 3 characters long'});
        }
        if (password.length < 8) {
            dataValidation.push({id: 'password', valid: false, message: 'Password must be at least 8 characters long'});
        }
        if (password !== repeatPassword) {
            dataValidation.push({id: 'repeatPassword', valid: false, message: 'Passwords must match'});
        }
        return dataValidation;
    }

    const validateFormCompletion = () => {
        //TODO should be implemented in a more advanced way
        if (formType === 'register') {
            return formData.email.length > 0 && formData.username.length > 0 && formData.password.length > 0 && formData.repeatPassword.length > 0;
        } else {
            return formData.username.length > 0 && formData.password.length > 0;
        }
    }

    return (
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
                        <label className={styles.loginLabel} htmlFor="email">Email</label>
                        <input className={styles.loginInput} type="email" id="email" name="email" onChange={handleChange} value={formData.email} required/>
                    </div>
                        : null}
                    <div className={styles.loginInputContainer}>
                        <label className={styles.loginLabel} htmlFor="username">
                            {formType === 'login' ? 'Email / Username'
                                : formType === 'register' ? 'Username'
                                    : null}
                        </label>
                        <input className={styles.loginInput} type="text" id="username" name="username" onChange={handleChange} value={formData.username} required/>
                    </div>
                    <div className={formType === 'login' ? styles.lastInputContainer
                        : formType === 'register' ? styles.loginInputContainer
                            : ''}>
                        <label className={styles.loginLabel} htmlFor="password">Password</label>
                        <input className={styles.loginInput} type="password" id="password" name="password" onChange={handleChange} value={formData.password} required/>
                    </div>
                    {formType === 'register' ? <div className={styles.lastInputContainer}>
                        <label className={styles.loginLabel} htmlFor="repeatPassword">Repeat Password</label>
                        <input className={styles.loginInput} type="password" id="repeatPassword" name="repeatPassword" onChange={handleChange} value={formData.repeatPassword} required/>
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
                </form>
            </div>
        </div>
    );
};

export default Login;
