import React, {useEffect, useRef, useState} from "react";
import styles from  "./GroupSettings.module.css";
import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonToast,
    RefresherEventDetail,
    useIonRouter
} from "@ionic/react";
import { menuController } from '@ionic/core/components';
import Toolbar from "../../components/Toolbar/Toolbar";
import placeholderProfilePic from "../../assets/icons/placeholder-profile-pic.svg";
import { fetchGroup, fetchUserInGroup, addGroupMember, removeGroupMember, deleteGroup } from "../../services/GroupService";
import { useParams } from "react-router";
import { set } from "mongoose";

const GroupSettings: React.FC = (): JSX.Element => {

    const router = useIonRouter();

    const { id } = useParams<{ id: string }>();

    const [showToast, setShowToast] = useState(false);
    const [groupDeleted, setGroupDeleted] = useState(false);
    const [userDeleted, setUserDeleted] = useState(false);
    const [userAdded, setUserAdded] = useState(false);


    const [group, setGroup] = useState(Object);
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState("");

    const handleRemoveMember = async (groupId: string, userId: string) => {
        await removeGroupMember(groupId, userId);
        await reloadData();
    }

    const handleDeleteGroup = async (groupId: string) => {
        router.push('/home')
        await deleteGroup(groupId);
        await reloadData();
    }

    const handleAddMember = async () => {
        if (newMember.trim() === "") return
        await addGroupMember(id, newMember);
        setNewMember("");
        await reloadData();
    };

    async function toggleMenu() {
        await menuController.open('groupMenu');
    }

    const reloadData = async () => {
        fetchGroup(id).then(data => {
            setGroup(data);
        });
        fetchUserInGroup(id).then(data => {
            setMembers(data);
        })
    };

    useEffect(() => {
        reloadData();
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            reloadData().then(() => {});
            event.detail.complete();
        }, 2000);
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <IonPage className={styles.background}>
            <div className={styles.headerWrapper}>
                <IonHeader className='ionHeader'>
                    <Toolbar
                        searchable={false}
                        pageTitle={"Group Settings"}
                        backButton={true}
                        toggleMenu={() => {toggleMenu}}
                    />
                </IonHeader>
            </div>
            <IonContent className='ionContent'>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent> </IonRefresherContent>
                </IonRefresher>
                <div className={styles.contentWrapper}>
                    <div className={styles.profileContent}>
                        <div>
                            <h2>
                                {group.name}
                            </h2>
                            <h6 className={styles.greyTextH6}>
                                {group.description}
                            </h6>
                        </div>
                        <div>
                            <h1>Members</h1>
                            <div className={styles.addMemberContainer}>
                                <input
                                    type="text"
                                    placeholder="+ Mitglied hinzufügen"
                                    className={styles.addMemberInput}
                                    value={newMember}
                                    onChange={(e) => setNewMember(e.target.value)}
                                />
                                <button className={styles.addMemberButton} onClick={handleAddMember}>+</button>
                            </div>         
                            {members.map((member: any, i: number) => (
                                    <div key={i} className={styles.memberContainer}>
                                        <img className={styles.profilePic} src={placeholderProfilePic} alt="profile-pic" />
                                        <div style={{ flexGrow: 1 }}>
                                            <h3>{member.nickname}</h3>
                                            <h6 className={styles.greyTextH6}>@{member.username}</h6>
                                        </div>
                                        <button className={styles.removeButton} onClick={() => handleRemoveMember(id, member._id)}>remove</button>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.FooterButtonContainer}>
                        <button className={styles.deleteAccountButton}
                                onClick={() => handleDeleteGroup(id)}
                        >
                            Delete Group
                        </button>
                    </div>
                </div>
            </IonContent>
            <IonToast
                className='ionToast'
                isOpen={showToast}
                onDidDismiss={() => {
                    setShowToast(false);
                }}
                message={"Delete Group " + (groupDeleted ? "successful" : "failed")}
                duration={2000}
            >
            </IonToast>
            <IonToast
                className='ionToast'
                isOpen={showToast}
                onDidDismiss={() => {
                    setShowToast(false);
                }}
                message={"Add User " + (userAdded ? "successful" : "failed")}
                duration={2000}
            >
            </IonToast>
            <IonToast
                className='ionToast'
                isOpen={showToast}
                onDidDismiss={() => {
                    setShowToast(false);
                }}
                message={"Remove User " + (userDeleted ? "successful" : "failed")}
                duration={2000}
            >
            </IonToast>
        </IonPage>
    );
}

export default GroupSettings;