import React, { useState } from 'react';
import styles from './AddGroupDialog.module.css';

import busterBeauCha from '../../assets/profilePics/Buster Beau Chá.png'
import jeanBastaban from '../../assets/profilePics/Jean Bastaban.png'
import reindoAchim from '../../assets/profilePics/Reindo Achim.png'
import rheinerZufall from '../../assets/profilePics/Rheiner Zufall.png'

interface User {
    name: string;
    profileImage: string;
    added: boolean;
}

const usersList: User[] = [
    { name: 'Buster Beau Chá', profileImage: busterBeauCha, added: false },
    { name: 'Jean Bastaban', profileImage: jeanBastaban, added: false },
    { name: 'Reindo Achim', profileImage: reindoAchim, added: false },
    { name: 'Reindo Achim', profileImage: reindoAchim, added: false },
    { name: 'Reindo Achim', profileImage: reindoAchim, added: false },
    { name: 'Reindo Achim', profileImage: reindoAchim, added: false },
    { name: 'Reindo Achim', profileImage: reindoAchim, added: false },
    { name: 'Reindo Achim', profileImage: reindoAchim, added: false },
    { name: 'Rheiner Zufall', profileImage: rheinerZufall, added: false }
];

interface AddGroupDialogProps {
    onClose: () => void;
}

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({ onClose }) => {
    const [users, setUsers] = useState(usersList);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleUser = (index: number) => {
        setUsers(prevUsers => prevUsers.map((user, i) => i === index ? { ...user, added: !user.added } : user));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p>Create Group</p>
            </div>
            <div className={styles.inputBox}>
                <input className={styles.input} placeholder="Name" />
                <span className={styles.inputLabel}>Name</span>
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
                <button className={styles.createButton}>CREATE USER</button>
                <button className={styles.cancelButton} onClick={onClose}>CANCEL</button>
            </div>
        </div>
    );
};

export default AddGroupDialog;