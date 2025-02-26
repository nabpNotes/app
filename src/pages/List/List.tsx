import styles from './List.module.css';
import {IonContent, IonFooter, IonHeader, IonPage} from "@ionic/react";
import Toolbar from "../../components/Toolbar/Toolbar";
import React, {useEffect, useState} from "react";
import { io } from "socket.io-client";
import {useParams} from "react-router";

const List: React.FC = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState(Object);
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            extraHeaders: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        socket.on('connect', () => {
            console.log('Socket.io connection established');
            socket.emit('getList', {listId: id});
        });

        socket.on('list', (data) => {
            setList(data);
        });

        socket.on('disconnect', () => {
            console.log('Socket.io connection closed');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket.io connection error:', error);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <IonPage className='background'>
            <IonHeader className='ionHeader'>
                <Toolbar
                    searchable={false}
                    pageTitle={list.name}
                    backButton={true}
                />
            </IonHeader>
            <IonContent className="ionContent">
                <div className={styles.listsItemContainer}>

                </div>
            </IonContent>
            <IonFooter>
                <div className={styles.addButtonContainer}>
                    <button className={styles.addButton}>+</button>
                </div>
            </IonFooter>
        </IonPage>
    );
};

export default List;