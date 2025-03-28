import styles from './Group.module.css';
import React, {useEffect, useState} from "react";
import {IonContent, IonFooter, IonHeader, IonModal, IonPage, IonToast, useIonRouter} from "@ionic/react";
import {validateToken} from "../../services/AuthService";
import Toolbar from "../../components/Toolbar/Toolbar";
import GroupListItem from "../../components/GroupListItem/GroupListItem";
import {fetchGroup} from "../../services/GroupService";
import {useParams} from "react-router";
import {fetchListsByGroup} from "../../services/ListService";
import AddListDialog from "../../components/AddListDialog/AddListDialog";

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);


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

    return (
        <IonPage className='background'>
            <IonHeader className='ionHeader'>
                <Toolbar
                    searchable={false}
                    pageTitle={group.name}
                    backButton={true}
                />
            </IonHeader>
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
                    <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
                        Add List
                    </button>
                </div>
            </IonFooter>

            <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}
                      breakpoints={[0, 1]} initialBreakpoint={1} className={styles.ionModal}>
                <AddListDialog onClose={() => setIsModalOpen(false)}
                                setToastMessage={setToastMessage}
                                setShowToast={setShowToast}
                                groupId={id}/>
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

export default Group;
