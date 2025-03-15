import React, { useState } from 'react';
import styles from './AddGroupDialog.module.css';

interface User {
    name: string;
    profileImage: string;
    added: boolean;
}

const usersList: User[] = [
    { name: 'Alice', profileImage: 'favicon.png', added: false },
    { name: 'Bob', profileImage: 'favicon.png', added: false },
    { name: 'Charlie', profileImage: 'favicon.png', added: false },
    { name: 'David', profileImage: 'favicon.png', added: false },
    { name: 'Eve', profileImage: 'favicon.png', added: false },
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
        <div className={styles.background}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p>Gruppe erstellen</p>
                </div>
                <div className={styles.inputBox}>
                    <input className={styles.input} placeholder="Name" />
                    <span className={styles.inputLabel}>Name</span>
                </div>
                <div className={styles.inputBox}>
                    <input
                        className={styles.input}
                        placeholder="+User suchen"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className={styles.inputLabel}>+User suchen</span>
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
                    <button className={styles.createButton}>Gruppe erstellen</button>
                    <button className={styles.cancelButton} onClick={onClose}>Abbrechen</button>
                </div>
            </div>
        </div>
    );
};

export default AddGroupDialog;