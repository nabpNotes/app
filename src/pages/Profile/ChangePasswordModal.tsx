import React, {useEffect, useState} from "react";
import {IonButton, IonContent, IonInput, IonModal} from "@ionic/react";
import styles from  "./Profile.module.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onChange: (oldPassword: string, newPassword: string) => void
}

/**
 * ChangePasswordModal component that allows to enter the old password for validation
 * and the new password to replace the old one
 * @param isOpen if the modal is currently opened
 * @param onClose defines the action if modal gets closed
 * @param onChange defines the action if a password change is executed
 * @constructor
 */
const ChangePasswordModal: React.FC<Props> = ({ isOpen, onClose, onChange }) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isValid, setIsValid] = useState(false);

    /**
     * useEffect Hook to validate the password fields
     * - new password has to be repeated
     * - new password has to be at least 8 characters long
     */
    useEffect(() => {
        setIsValid(
            oldPassword.length >= 8 &&
            newPassword.length >= 8 &&
            repeatPassword.length >= 8 &&
            newPassword === repeatPassword
        );
    }, [oldPassword, newPassword, repeatPassword]);


    return(
        <IonModal
            id="change-password-modal"
            isOpen={isOpen}
            onDidDismiss={() => {isOpen = false}}
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
                                onChange(oldPassword, newPassword);
                            }}
                            disabled={!isValid}
                        >
                            Change
                        </IonButton>
                        <IonButton
                            className={styles.cancelButton}
                            onClick={() => {
                                console.log("change password canceled");
                                onClose()
                            }}
                        >
                            Cancel
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default ChangePasswordModal;