import styles from './Home.module.css';
import React, {useEffect} from "react";
import Toolbar from '../components/Toolbar/Toolbar';
import GroupListItem from '../components/GroupListItem/GroupListItem';

import {fetchGroups} from '../services/GroupService';
import {IonContent, IonFooter, IonHeader} from "@ionic/react";

/**
 * Home page
 * @returns {JSX.Element}
 * This page is the home page of the application.
 * It displays the groups the user is a member of.
 **/
const Home: React.FC = (): JSX.Element => {
    const [groups, setGroups] = React.useState([]);

    useEffect(() => {
        fetchGroups().then((data) => {
            setGroups(data);
        });
    }, []);

    return (
        <div className='background'>
            <IonHeader>
                <Toolbar
                    searchable={true}
                    pageTitle={"WG Uni 🏚️"}
                    backButton={false}
                />
            </IonHeader>
            <IonContent className="ionContent">
                <div className={styles.groupList}>
                    {groups.map((group: any) => (
                        <GroupListItem
                            type={'group'}
                            title={group.name}
                        />
                    ))}
                </div>
            </IonContent>
            <IonFooter>
                <div className={styles.addButtonContainer}>
                    <button className={styles.addButton}>+</button>
                </div>
            </IonFooter>
        </div>
    );
};

export default Home;
