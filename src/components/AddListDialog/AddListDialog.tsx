import React, { useState } from 'react';
import styles from './AddListDialog.module.css';
import {createList} from "../../services/ListService";

interface AddListDialogProps {
    onClose: () => void;
    setToastMessage: (message: string) => void;
    setShowToast: (show: boolean) => void;
    groupId: string;
}

/**
 * AddListDialog component
 * @param {function} onClose - Callback function to close the modal
 * @param {function} setToastMessage - Function to set the toast message (success or error)
 * @param {function} setShowToast - Function to show or hide the toast notification
 * @returns {JSX.Element} - The add list dialog modal
 * This component allows users to create a new list by providing a list name and selecting users to add.
 */
const AddListDialog: React.FC<AddListDialogProps> = ({ onClose, setToastMessage, setShowToast, groupId }) => {
    const [listName, setListName] = useState("");

    const handleCreateList = async () => {
        const createListDto = {
            name: listName || 'My New List',
            createdAt: Date.now()
        };

        try {
            const response = await createList(groupId, createListDto);

            setToastMessage(response.message);
            setShowToast(true);
        } catch (error) {
            setToastMessage("Error creating list");
            setShowToast(true);
        }

        onClose();
    };

    return (
        <div className={styles.contentBox}>
            <div className={styles.header}>
                <p>Create List</p>
            </div>

            <div className={styles.inputBox}>
                <input
                    className={styles.input}
                    placeholder="List Name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                />
                <span className={styles.inputLabel}>List Name</span>
            </div>

            <div className={styles.controlButtons}>
                <button className={styles.createButton} onClick={handleCreateList}>
                    ADD LIST
                </button>
                <button className={styles.cancelButton} onClick={onClose}>
                    CANCEL
                </button>
            </div>
        </div>
    );
};

export default AddListDialog;