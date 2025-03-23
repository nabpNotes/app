import React, { useEffect, useState } from 'react';
import styles from './AddGroupDialog.module.css';
import { createGroup } from "../../services/GroupService";

import addedIcon from "../../assets/icons/addedIcon.svg"
import addIcon from "../../assets/icons/addIcon.svg"

import {fetchUsers} from "../../services/UserService";


// Interface for user data
interface User {
    userId: string;
    name: string;
    profileImage: string;
    added: boolean;
}

// Props interface for AddGroupDialog component
interface AddGroupDialogProps {
    onClose: () => void;
    setToastMessage: (message: string) => void;
    setShowToast: (show: boolean) => void;
}

/**
 * AddGroupDialog component
 * @param {function} onClose - Callback function to close the modal
 * @param {function} setToastMessage - Function to set the toast message (success or error)
 * @param {function} setShowToast - Function to show or hide the toast notification
 * @returns {JSX.Element} - The add group dialog modal
 * This component allows users to create a new group by providing a group name and selecting users to add.
 */
const AddGroupDialog: React.FC<AddGroupDialogProps> = ({ onClose, setToastMessage, setShowToast }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers.filter(user => user.userId.toString() != localStorage.getItem('userId')));
            } catch (error) {
                setError("Error loading users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const toggleUser = (userId: string) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.userId === userId ? { ...user, added: !user.added } : user
            )
        );
    };


    const filteredUsers = users.filter(user =>
        user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle group creation and notify with toast
    const handleCreateGroup = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        // Create group admin object
        const me = {
            userId,
            role: 'groupadmin',
            joinedAt: Date.now(),
        };

        // Create members array (including the admin and selected users)
        let members = users
            .filter(user => user.added) // Only users that are added
            .map(user => ({
                userId: user.userId,
                role: 'user',
                joinedAt: Date.now(),
            }));

        members.unshift(me); // Add admin as the first member

        // Group creation payload
        const createGroupDto = {
            name: groupName || 'My New Group',
            members,
            lists: [], // Assuming you want to manage lists later
            createdAt: Date.now()
        };

        try {
            // Create the group by calling the service function
            const response = await createGroup(createGroupDto);

            // Set success message and show toast
            setToastMessage(response.message);
            setShowToast(true);
        } catch (error) {
            // Handle error by setting the message and showing toast
            setToastMessage("Ein Fehler ist aufgetreten!");
            setShowToast(true);
        }

        // Close the dialog after attempting to create the group
        onClose();
    };

    return (
        <div className={styles.contentBox}>
            <div className={styles.header}>
                <p>Create Group</p>
            </div>

            {/* Error Message */}
            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.inputBox}>
                <input
                    className={styles.input}
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <span className={styles.inputLabel}>Group Name</span>
            </div>
            <div className={styles.inputBox}>
                <input
                    className={styles.input}
                    placeholder="Search User"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className={styles.inputLabel}>Search User</span>
            </div>

            {/* Ladeanzeige */}
            {loading ? (
                <div className={styles.loading}>Loading users...</div>
            ) : (
                <div className={styles.userPicker}>
                    {filteredUsers.map((user) => (
                        <div key={user.userId} className={styles.userItem} onClick={() => toggleUser(user.userId)}>
                            <img src={user.profileImage} alt={user.name} className={styles.userImage} />
                            <p className={styles.userName}>{user.name}</p>
                            {user.added ?
                                <img src={addedIcon} alt="✓" className={styles.addUserIcon} />
                                :
                                <img src={addIcon} alt="+" className={styles.addUserIcon} />
                            }
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.controlButtons}>
                <button className={styles.createButton} onClick={handleCreateGroup}>
                    CREATE GROUP
                </button>
                <button className={styles.cancelButton} onClick={onClose}>
                    CANCEL
                </button>
            </div>
        </div>
    );
};

export default AddGroupDialog;
