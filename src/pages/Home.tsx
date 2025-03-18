import styles from './Home.module.css';
import React, {useEffect, useState} from "react";
import Toolbar from '../components/Toolbar/Toolbar';
import GroupListItem from '../components/GroupListItem/GroupListItem';
import AddGroupDialog from "../components/AddGroupDialog/AddGroupDialog";

import {fetchGroups} from '../services/GroupService';
import {IonContent, IonFooter, IonHeader, IonModal, IonPage, useIonRouter} from "@ionic/react";
import {validateToken} from "../services/AuthService";

/**
 * Home page
 * @returns {JSX.Element}
 * This page is the home page of the application.
 * It displays the groups the user is a member of.
 **/
const Home: React.FC = (): JSX.Element => {
    const router = useIonRouter();
    const [groups, setGroups] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        validateToken().then(r => {
            !r ? router.push('/login') : null;
        });
    }, []);

    useEffect(() => {
        fetchGroups().then((data) => {
            setGroups(data);
        });
    }, []);

    return (
        <IonPage className='background'>
            <IonHeader className='ionHeader'>
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
                            key={group._id}
                            itemId={group._id}
                            type={'group'}
                            title={group.name}
                        />
                    ))}
                </div>
            </IonContent>
            <IonFooter>
                <div className={styles.addButtonContainer}>
                    <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
                        Create Group
                    </button>
                </div>
            </IonFooter>

            <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}
                      breakpoints={[0, 0.75]} initialBreakpoint={0.75}>
                <div className={styles.modalContainer}>
                    <AddGroupDialog onClose={() => setIsModalOpen(false)}/>
                </div>
            </IonModal>

        </IonPage>
    );
};

export default Home;
