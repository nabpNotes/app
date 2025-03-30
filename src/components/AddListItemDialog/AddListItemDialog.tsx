import React, { useState } from 'react';
import styles from './AddListItemDialog.module.css';
import {createListItem} from "../../services/ListItemService";

interface AddListDialogProps {
    onClose: () => void;
    setToastMessage: (message: string) => void;
    setShowToast: (show: boolean) => void;
    listId: string;
}

/**
 * AddListItemDialog component
 * @param {function} onClose - Callback function to close the modal
 * @param {function} setToastMessage - Function to set the toast message (success or error)
 * @param {function} setShowToast - Function to show or hide the toast notification
 * @returns {JSX.Element} - The add list dialog modal
 * This component allows users to create a new list by providing a list name and selecting users to add.
 */
const AddListItemDialog: React.FC<AddListDialogProps> = ({ onClose, setToastMessage, setShowToast, listId }) => {
    const [listName, setListName] = useState("");

    const handleCreateText = async () => {
        const createText = {
            listId: listId,
            type: "text",
            title: "Edit Title",
            text: "Edit Text"
        };
        await send(createText);
    };

    const handleCreateCheckbox = async () => {

        const checklistItems = [{
            checked: false,
            checkboxLabel: "Edit Checker 1"
        }];

        const createText = {
            listId: listId,
            type: "checklist",
            title: "Edit Title",
            checklistItems: checklistItems
        };

        await send(createText);
    };

    const send = async (createText: any) => {
        try {
            const response = await createListItem(createText);

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
                <p>Add Item</p>
            </div>

            <div className={styles.controlButtons}>
                <button className={styles.createButton} onClick={handleCreateText}>
                    Text
                </button>
                <button className={styles.createButton} onClick={handleCreateCheckbox}>
                    Checkbox
                </button>
            </div>
        </div>
    );
};

export default AddListItemDialog;