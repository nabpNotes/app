import styles from './Home.module.css';
import React, {useEffect, useState} from "react";
import Toolbar from '../components/Toolbar/Toolbar';
import GroupListItem from '../components/GroupListItem/GroupListItem';
import AddGroupDialog from "../components/AddGroupDialog/AddGroupDialog";
import { menuController } from '@ionic/core/components';

import {fetchGroups} from '../services/GroupService';
import {
    IonContent,
    IonFooter,
    IonHeader,
    IonMenu,
    IonModal,
    IonPage,
    IonToast,
    useIonRouter
} from "@ionic/react";
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

    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

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

    async function toggleMenu() {
        await menuController.open('homeMenu');
    }

    return (
        <IonPage id="homeMenu" className="background">
            <IonHeader className='ionHeader'>
                <Toolbar
                    searchable={true}
                    pageTitle={"WG Uni 🏚️"}
                    backButton={false}
                    toggleMenu={toggleMenu}
                />
            </IonHeader>
            <IonMenu className="ionMenu" side="end" contentId="homeMenu" menuId="homeMenu">
                <IonContent className="ionMenuContent">
                    <div className="verticalFlexbox">
                        <div className="profileSettingsBtn">
                            <img src="src/assets/icons/exampleProfilePicture.svg" alt="profilepic"/>
                            <h4>Profile Settings</h4>
                        </div>
                    </div>
                </IonContent>
            </IonMenu>
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
                      breakpoints={[0, 1]} initialBreakpoint={1} className={styles.ionModal}>
                <AddGroupDialog onClose={() => setIsModalOpen(false)}
                                setToastMessage={setToastMessage}
                                setShowToast={setShowToast}/>
            </IonModal>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => {
                    setShowToast(false);
                }}
                message={toastMessage}
                duration={2000}
            />
        </IonPage>
    );
};

export default Home;
