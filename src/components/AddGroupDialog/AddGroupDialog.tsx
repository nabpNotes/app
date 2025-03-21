import React, { useEffect, useState } from 'react';
import styles from './AddGroupDialog.module.css';
import { IonContent } from "@ionic/react";
import { createGroup } from "../../services/GroupService";

import defaultProfilePicture from "../../assets/profilePics/Rheiner Zufall.png"

// User interface
interface User {
    userId: string;
    name: string;
    profileImage: string;
    added: boolean;
}

interface AddGroupDialogProps {
    onClose: () => void;
}

const fetchUsers = async (): Promise<User[]> => {
    const API_URL = import.meta.env.VITE_API_URL as string;
    try {
        const response = await fetch(`${API_URL}/user`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        return data.map((user: any) => ({
            userId: user._id,
            name: user.username,
            profileImage: user.profilePictureExt || defaultProfilePicture,
            added: false,
        }));
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
        return [];
    }
};

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({ onClose }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [groupName, setGroupName] = useState(""); // To capture the group name
    const [loading, setLoading] = useState(true);  // Ladezustand
    const [error, setError] = useState<string | null>(null);  // Fehlerzustand

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

    const toggleUser = (index: number) => {
        setUsers(prevUsers => prevUsers.map((user, i) => i === index ? { ...user, added: !user.added } : user));
    };

    const filteredUsers = users.filter(user =>
        user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const callCreateGroup = () => {
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

        createGroup(createGroupDto).then(r => {
            console.log(r.data); //TODO Hier new group created alert
        })
    };

    return (
        <IonContent>
            <div className={styles.content}>
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
                        {filteredUsers.map((user, index) => (
                            <div key={user.userId} className={styles.userItem} onClick={() => toggleUser(index)}>
                                <img src={user.profileImage} alt={user.name} className={styles.userImage} />
                                <p className={styles.userName}>{user.name}</p>
                                <span>{user.added ? '✓' : '+'}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.controlButtons}>
                    <button className={styles.createButton} onClick={callCreateGroup}>
                        CREATE GROUP
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        CANCEL
                    </button>
                </div>
            </div>
        </IonContent>
    );
};

export default AddGroupDialog;
