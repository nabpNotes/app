import styles from './List.module.css';
import {IonContent, IonFooter, IonHeader, IonPage} from "@ionic/react";
import Toolbar from "../../components/Toolbar/Toolbar";
import React, {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useParams} from "react-router";
import TextItem from "../../components/ListItem/TextItem/TextItem";
const API_URL = import.meta.env.VITE_API_URL as string;

const List: React.FC = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState(Object);
    const [listItems, setListItems] = useState([]);
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const socket = io(`${API_URL}`, {//TODO: Socket connection must be refactored
            extraHeaders: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Socket.io connection established');
            socket.emit('getList', {listId: id});
        });

        socket.on('list', (data) => {
            console.log(data);
            setList(data);
        });

        socket.on('listItems', (data) => {
            console.log(data);
            setListItems(data);
        });

        socket.on('message', (data) => {
            console.log(data);
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

    useEffect(() => {
        setListItems([]);
        if (socket) {
            socket.emit('getListItems', {listId: id});
        }
    }, [list]);

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
                    {listItems.map((listItem: any) => {
                        switch (listItem.type) {
                            case 'text':
                                return <TextItem
                                    key={listItem.id}
                                    itemData={listItem}/>;
                            default:
                                return null;
                        }
                    })}
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