import React, {useRef, useState} from "react";
import styles from  "./Profile.module.css";
import {IonAlert, IonButton, IonContent, IonFooter, IonHeader, IonInput, IonModal, IonPage} from "@ionic/react";
import Toolbar from "../../components/Toolbar/Toolbar";
import placeholderProfilePic from "../../assets/icons/placeholder-profile-pic.svg";

const Profile: React.FC = (): JSX.Element => {

    const [isOpenDeleteAccount, setIsOpenDeleteAccount] = useState(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const isValid =
        oldPassword.length >= 8 &&
        newPassword.length >= 8 &&
        repeatPassword.length >= 8 &&
        newPassword === repeatPassword;

    const modal = useRef<HTMLIonModalElement>(null);

    const dismiss = () => {
        modal.current?.dismiss();
    }

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
                        <h2>
                            Rainer
                        </h2>
                        <h6 className={styles.greyTextH6}>
                            Profile Name
                        </h6>
                    </div>
                    <div>
                        <h2>
                            @rainerxoxo
                        </h2>
                        <h6 className={styles.greyTextH6}>
                            Username
                        </h6>
                    </div>
                    <div>
                        <h2>Profile Link</h2>
                        <h6 className={styles.greyTextH6}>
                            https://nabp/profile...
                        </h6>
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <div className={styles.FooterButtonContainer}>
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
            {/*
            <IonAlert
                isOpen={isOpenChangePassword}
                onDidDismiss={() => setIsOpenChangePassword(false)}
                trigger="change-password"
                header="Change Password"
                subHeader="This cannot be undone!"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'cancelDeleteButton',
                        handler: () => {
                            console.log("Change password canceled");
                        }
                    },
                    {
                        text: "Change",
                        role: 'Change',
                        htmlAttributes: {
                            disabled: !isValid
                        },
                        cssClass: 'confirmDeleteButton',
                        handler: () => {
                            console.log("Change password confirmed")
                        }
                    }
                ]}
                inputs={[
                    {
                        placeholder: 'old password',
                        type: 'password',
                        cssClass: 'alertInputField',
                        handler: (e: any) => setOldPassword(e.detail.value),
                        attributes: {
                            minlength: 8
                        }
                    },
                    {
                        placeholder: 'new password',
                        type: 'password',
                        cssClass: 'alertInputField',
                        handler: (e: any) => setNewPassword(e.detail.value),
                        attributes: {
                            minlength: 8
                        }
                    },
                    {
                        placeholder: 'repeat new password',
                        type: 'password',
                        cssClass: 'alertInputField',
                        handler: (e: any) => setRepeatPassword(e.detail.value),
                        attributes: {
                            minlength: 8
                        }
                    },
                ]}
            >
            </IonAlert>
            */}
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