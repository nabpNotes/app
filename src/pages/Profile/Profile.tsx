import React, {useEffect, useRef, useState} from "react";
import styles from  "./Profile.module.css";
import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
    IonToast,
    useIonRouter
} from "@ionic/react";
import Toolbar from "../../components/Toolbar/Toolbar";
import placeholderProfilePic from "../../assets/icons/placeholder-profile-pic.svg";
import {updateNickname, deleteAccount, updatePassword} from "../../services/UserService";
import DeleteAccountAlert from "./DeleteAccountAlert";
import ChangePasswordModal from "./ChangePasswordModal";

const Profile: React.FC = (): JSX.Element => {

    const router = useIonRouter();

    const [isOpenDeleteAccount, setIsOpenDeleteAccount] = useState(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(localStorage.getItem('nickname') || "");
    const [tempName, setTempName] = useState(name);

    const [showToast, setShowToast] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

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
                localStorage.setItem('nickname', tempName);
            } else {
                console.error("Failed to update nickname:", response.error);
            }
        }
    }

    const handleDeleteAccount = async () => {
        const response = await deleteAccount();
        if (!response.error) {
            console.log("Delete account successful!");
            handleLogout();
        } else {
            console.error("Failed to delete account:", response.error);
        }
    }

    const handleUpdatePassword = async (oldPassword: string, newPassword: string) => {
        if (!newPassword) {
            console.error("Please enter new password.");
            return;
        }

        const response = await updatePassword(newPassword, oldPassword);
        if (!response.error) {
            console.log("Password changed successfully!");
            setIsOpenChangePassword(false);
            setPasswordChanged(true);
        } else {
            console.error("Failed to change password:", response.error);
            setPasswordChanged(false);
        }

        setShowToast(true);
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
            <DeleteAccountAlert
                isOpen={isOpenDeleteAccount}
                onClose={() => setIsOpenDeleteAccount(false)}
                onDelete={handleDeleteAccount}>
            </DeleteAccountAlert>
            <ChangePasswordModal
                isOpen={isOpenChangePassword}
                onClose={() => setIsOpenChangePassword(false)}
                onChange={handleUpdatePassword}>
            </ChangePasswordModal>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => {
                    setShowToast(false);
                }}
                message={"Changing Password " + (passwordChanged ? "successful" : "failed")}
                duration={2000}
            >
            </IonToast>
        </IonPage>
    );
}

export default Profile;