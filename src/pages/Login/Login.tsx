import styles from './Login.module.css';
import React, {useEffect} from "react";
import {useIonRouter} from "@ionic/react";

import {validateToken} from "../../services/AuthService";

/**
 * Home page
 * @returns {JSX.Element}
 * This page is the home page of the application.
 * It displays the groups the user is a member of.
 **/
const Login: React.FC = (): JSX.Element => {
    const router = useIonRouter();

    useEffect(() => {
        validateToken().then(r => {
            if (r) {
                router.push('/home');
            } else {
                router.push('/login');
            }
        });
    }, []);

    return (
        <div className="background">

        </div>
    );
};

export default Login;
