import React, {useRef, useState} from "react";
import styles from  "./Profile.module.css";
import {
    IonAlert,
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonModal,
    IonPage, useIonRouter
} from "@ionic/react";
import Toolbar from "../../components/Toolbar/Toolbar";
import placeholderProfilePic from "../../assets/icons/placeholder-profile-pic.svg";
import {updateNickname} from "../../services/UserService";

const Profile: React.FC = (): JSX.Element => {

    const router = useIonRouter();

    const [isOpenDeleteAccount, setIsOpenDeleteAccount] = useState(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(localStorage.getItem('nickname') || "");
    const [tempName, setTempName] = useState(name);

    const isValid =
        oldPassword.length >= 8 &&
        newPassword.length >= 8 &&
        repeatPassword.length >= 8 &&
        newPassword === repeatPassword;

    const handleLogout = () => {
        localStorage.removeItem("nickname");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");
        router.push("/login", "root");
        setTimeout(() => window.location.reload(), 100);
    }

    const handleUpdateNickname = async () => {
        if (!(tempName === name)) {
            const response = await updateNickname(tempName);
            if (!response.error) {
                setName(tempName);
                setTempName(tempName);
                setIsEditing(false);
            } else {
                console.error("Failed to update nickname:", response.error);
            }
        }
    }

    const modal = useRef<HTMLIonModalElement>(null);

    const dismiss = () => {
        modal.current?.dismiss();
    }

    // @ts-ignore
    return (
        <IonPage className='background'>
            <IonHeader className='ionHeader'>
                <Toolbar
                    searchable={false}
                    pageTitle={"Profile Settings"}
                    backButton={true}
                />
            </IonHeader>
            <IonContent className='ionContent'>
                <div className={styles.profileContent}>
                    <div>
                        <img src={placeholderProfilePic} alt={"profile-pic"} className={styles.profilePic}></img>
                    </div>
                    <div>
                        <div className={styles.profileNameItem}>
                            {isEditing ? (
                                <div className={styles.profileNameWrapper}>
                                    <input
                                        className={styles.profileNameInput}
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        autoFocus
                                        onBlur={() => {
                                            setTempName(name);
                                            setIsEditing(false);
                                        }}
                                    />
                                    <IonButton
                                        className={styles.changeButton}
                                        onMouseDown={handleUpdateNickname}
                                        disabled={tempName.length < 1}
                                    >
                                        Save
                                    </IonButton>
                                </div>
                            ) : (
                                <h2 onClick={() => setIsEditing(true)}>{name}</h2>
                            )}
                        </div>
                        <h6 className={styles.greyTextH6}>
                            Nickname
                        </h6>
                    </div>
                    <div>
                        <h2>
                            {localStorage.getItem('username')}
                        </h2>
                        <h6 className={styles.greyTextH6}>
                            Username
                        </h6>
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <div className={styles.FooterButtonContainer}>
                    <button className={styles.changePasswordButton}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button className={styles.changePasswordButton}
                            onClick={() => setIsOpenChangePassword(true)}
                    >
                        Change Password
                    </button>
                    <button className={styles.deleteAccountButton}
                            onClick={() => setIsOpenDeleteAccount(true)}
                    >
                        Delete Account
                    </button>
                </div>
            </IonFooter>
            <IonAlert
                isOpen={isOpenDeleteAccount}
                header="Do you really want to delete your account?"
                subHeader="This cannot be undone!"
                className={styles.deleteAccountAlert}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'cancelDeleteButton',
                        handler: () => {
                            console.log("Delete Account canceled");
                        }
                    },
                    {
                        text: "Delete",
                        role: 'delete',
                        cssClass: 'confirmDeleteButton',
                        handler: () => {
                            console.log("Delete Action confirmed")
                        }
                    }

                ]}
                onDidDismiss={() => setIsOpenDeleteAccount(false)}
            >
            </IonAlert>
            <IonModal
                id="change-password-modal"
                isOpen={isOpenChangePassword}
                onDidDismiss={() => setIsOpenChangePassword(false)}
            >
                <IonContent className='ionContent'>
                    <div className={styles.changePasswordModal}>
                        <h2 className={styles.modalHeader}>Change your Password</h2>
                        <IonInput
                            class="modal-password-input"
                            type="password"
                            placeholder="old password"
                            onIonInput={(e) => setOldPassword(e.detail.value!)}
                        />
                        <IonInput
                            class="modal-password-input"
                            type="password"
                            placeholder="new password"
                            onIonInput={(e) => setNewPassword(e.detail.value!)}
                        />
                        <IonInput
                            class="modal-password-input"
                            type="password"
                            placeholder="repeat new password"
                            onIonInput={(e) => setRepeatPassword(e.detail.value!)}
                        />
                        <div className={styles.modalButtonsContainer}>
                            <IonButton
                                className={styles.changeButton}
                                onClick={() => {
                                    console.log("change password confirmed");
                                    setIsOpenChangePassword(false);
                                }}
                                disabled={!isValid}
                            >
                                Change
                            </IonButton>
                            <IonButton
                                className={styles.cancelButton}
                                onClick={() => {
                                    console.log("change password canceled");
                                    setIsOpenChangePassword(false);
                                }}
                            >
                                Cancel
                            </IonButton>
                        </div>
                    </div>
                </IonContent>
            </IonModal>
        </IonPage>
    );
}

export default Profile;