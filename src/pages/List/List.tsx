import styles from './List.module.css';
import {IonContent, IonFooter, IonHeader, IonPage, useIonRouter} from "@ionic/react";
import Toolbar from "../../components/Toolbar/Toolbar";
import React, {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useParams} from "react-router";
import TextItem from "../../components/ListItem/TextItem/TextItem";
import {updateListItem} from "../../services/ListItemService";

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * This component renders a list of items.
 * @returns {JSX.Element} - The rendered component.
 */
const List: React.FC = (): JSX.Element => {
    const router = useIonRouter();
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState(Object);
    const [listItems, setListItems] = useState<any[]>([]);
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

        socket.on('listItemUpdate', (data) => {
            console.log('update listItem' + JSON.stringify(data));
            setListItems(prevListItems => {
                return prevListItems.map(item =>
                    item._id === data._id ? data : item
                );
            });
        })

        socket.on('disconnect', () => {
            console.log('Socket.io connection closed');
            router.goBack();
        });

        socket.on('connect_error', (error) => {
            console.error('Socket.io connection error:', error);
            router.goBack();
        });

        const handleItemDataUpdated = (event: CustomEvent) => {
            let requestData = event.detail;
            requestData.listId = id;
            updateListItem(event.detail._id, event.detail).then().catch(e => {
                console.error(e);
                refreshListItems();
            });
        };

        window.addEventListener('itemDataUpdated' as any, handleItemDataUpdated as EventListener);

        return () => {
            socket.disconnect();
            window.removeEventListener('itemDataUpdated' as any, handleItemDataUpdated as EventListener);
        };
    }, []);

    useEffect(() => {
        setListItems([]);
        if (socket) {
            socket.emit('getListItems', {listId: id});
        }
    }, [list]);

    const refreshListItems = () => {
        if (socket) {
            socket.emit('getListItems', {listId: id});
        }
    }

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