import React from 'react';
import {IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar} from '@ionic/react';
import styles from './AddGroupDialog.module.css';

interface AddGroupDialogProps {
    onClose: () => void;
}

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({ onClose }) => {
    return (
        <>
            <div className={styles.background}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <p>Gruppe erstellen</p>
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            className={styles.input}
                            placeholder="Name"
                        />
                        <span className={styles.inputLabel}>Name</span>
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            className={styles.input}
                            placeholder="+User suchen"
                        />
                        <span className={styles.inputLabel}>+User suchen</span>
                    </div>
                    <div className={styles.userPicker}>

                        <div>
                            <p>
                                User
                            </p>
                        </div>
                        <div>
                            <p>
                                User
                            </p>
                        </div>
                        <div>
                            <p>
                                User
                            </p>
                        </div>
                        <div>
                            <p>
                                User
                            </p>
                        </div>
                        <div>
                            <p>
                                User
                            </p>
                        </div>

                    </div>
                    <div className={styles.controlButtons}>
                        <button className={styles.createButton}>Gruppe erstellen</button>
                        <button className={styles.cancelButton} onClick={onClose}>Abbrechen</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddGroupDialog;
