import styles from './Group.module.css';
import React, {useEffect, useState} from "react";
import {IonContent, IonFooter, IonHeader, IonMenu, IonPage, useIonRouter} from "@ionic/react";
import {validateToken} from "../../services/AuthService";
import Toolbar from "../../components/Toolbar/Toolbar";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import {fetchGroup} from "../../services/GroupService";
import {useParams} from "react-router";
import {fetchListsByGroup} from "../../services/ListService";
import {menuController} from "@ionic/core/components";

/**
 * Group page
 * @returns {JSX.Element}
 * This page is the group page of the application.
 * It displays the lists of the group.
 **/
const Group: React.FC = (): JSX.Element => {
    const router = useIonRouter();
    const { id } = useParams<{ id: string }>();
    const [group, setGroup] = useState(Object);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        validateToken().then(r => {
            !r ? router.push('/login') : null;
        });
    }, []);

    useEffect(() => {
        fetchGroup(id).then(data => {
            setGroup(data);
        });
        fetchListsByGroup(id).then(data => {
            setLists(data);
        });
        //TODO Gutes Error Handling ausdenken
    }, []);

    async function toggleMenu() {
        await menuController.open('groupMenu');
    }

    return (
        <IonPage id="groupMenu" className='background'>
            <IonHeader className='ionHeader'>
                <Toolbar
                    searchable={false}
                    pageTitle={group.name}
                    backButton={true}
                    toggleMenu={toggleMenu}
                />
            </IonHeader>
            <IonMenu className="ionMenu" side="end" contentId="groupMenu" menuId="groupMenu">
                <IonContent className="ionMenuContent">
                    <div className="verticalFlexbox">
                        <div className="profileSettingsBtn">
                            <img src="src/assets/icons/exampleProfilePicture.svg" alt="profilepic"/>
                            <h4>Profile Settings</h4>
                        </div>
                        <div className="groupSettingsBtn">
                            <h4>{group.name}</h4>
                            <h4>Group Settings</h4>
                        </div>
                    </div>
                </IonContent>
            </IonMenu>
            <IonContent className="ionContent">
                <div className={styles.listsContainer}>
                    {lists.map((list: any) => (
                        <GroupListItem
                            key={list._id}
                            itemId={list._id}
                            type={'list'}
                            title={list.name}
                        />
                    ))}
                </div>
            </IonContent>
            <IonFooter>
                <div className={styles.addButtonContainer}>
                    <button className={styles.addButton}>+</button>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default Group;
