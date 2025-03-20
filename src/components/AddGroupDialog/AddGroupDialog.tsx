import React, { useState } from 'react';
import styles from './AddGroupDialog.module.css';
import busterBeauCha from '../../assets/profilePics/Buster Beau Chá.png'
import jeanBastaban from '../../assets/profilePics/Jean Bastaban.png'
import reindoAchim from '../../assets/profilePics/Reindo Achim.png'
import rheinerZufall from '../../assets/profilePics/Rheiner Zufall.png'
import { IonContent } from "@ionic/react";
import {createGroup} from "../../services/GroupService";

// User interface
interface User {
    userId: string;
    name: string;
    profileImage: string;
    added: boolean;
}

// List of users
const usersList: User[] = [
    { userId: "1", name: 'Buster Beau Chá', profileImage: busterBeauCha, added: false },
    { userId: "2",  name: 'Jean Bastaban', profileImage: jeanBastaban, added: false },
    { userId: "3",  name: 'Reindo Achim', profileImage: reindoAchim, added: false },
    { userId: "4",  name: 'Rheiner Zufall', profileImage: rheinerZufall, added: false }
];

// AddGroupDialog Props
interface AddGroupDialogProps {
    onClose: () => void;
}

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({ onClose }) => {
    const [users, setUsers] = useState(usersList);
    const [searchTerm, setSearchTerm] = useState("");
    const [groupName, setGroupName] = useState(""); // To capture the group name

    const toggleUser = (index: number) => {
        setUsers(prevUsers => prevUsers.map((user, i) => i === index ? { ...user, added: !user.added } : user));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                role: 'member',
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
                <div className={styles.userPicker}>
                    {filteredUsers.map((user, index) => (
                        <div key={index} className={styles.userItem} onClick={() => toggleUser(index)}>
                            <img src={user.profileImage} alt={user.name} className={styles.userImage} />
                            <p className={styles.userName}>{user.name}</p>
                            <span>{user.added ? '✓' : '+'}</span>
                        </div>
                    ))}
                </div>
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
