import React from "react";
import {IonAlert} from "@ionic/react";
import styles from  "./Profile.module.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

/**
 * DeleteAccountAlert component that warns the user about the delete action
 * and asks for confirmation or canceling
 * @param isOpen if the alert is currently opened
 * @param onClose defines the action if alert gets closed
 * @param onDelete defines the action if he account should be deleted
 * @constructor
 */
const DeleteAccountAlert: React.FC<Props> = ({ isOpen, onClose, onDelete }) => {
    return(
        <IonAlert
            isOpen={isOpen}
            header="Do you really want to delete your account?"
            subHeader="This cannot be undone!"
            className={styles.deleteAccountAlert}
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'cancelDeleteButton',
                    handler: onClose
                },
                {
                    text: "Delete",
                    role: 'delete',
                    cssClass: 'confirmDeleteButton',
                    handler: onDelete
                }

            ]}
            onDidDismiss={onClose}
        >
        </IonAlert>
    );
}
export default DeleteAccountAlert;

