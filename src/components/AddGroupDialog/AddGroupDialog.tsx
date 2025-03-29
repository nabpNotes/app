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

    const handleCreateGroup = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const me = {
            userId,
            role: 'groupadmin',
            joinedAt: Date.now(),
        };

        let members = users
            .filter(user => user.added)
            .map(user => ({
                userId: user.userId,
                role: 'user',
                joinedAt: Date.now(),
            }));

        members.unshift(me);

        const createGroupDto = {
            name: groupName || 'My New Group',
            members,
            lists: [],
            createdAt: Date.now()
        };

        try {
            const response = await createGroup(createGroupDto);

            setToastMessage(response.message);
            setShowToast(true);
        } catch (error) {
            setToastMessage("Error creating group");
            setShowToast(true);
        }

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
