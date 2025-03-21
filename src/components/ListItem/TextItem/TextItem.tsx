import styles from './TextItem.module.css';
import React, {useEffect, useRef, useState} from "react";
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding} from "@ionic/react";
import {trash, settings} from 'ionicons/icons';
import * as events from "node:events"; //TODO: Change Icon

interface TextItemProps {
    itemData: {
        title: string;
        text: string;
    };
}

const TextItem: React.FC<TextItemProps> = ({itemData}: TextItemProps): JSX.Element => {
    const [itemDataState, setItemDataState] = useState(itemData);
    const [itemDataCopy, setItemDataCopy] = useState(itemData);
    const [isEditing, setIsEditing] = useState(false);
    const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

    useEffect(() => {
        setItemDataState(itemData);
    }, [itemData]);

    const editItem = () => {
        slidingRef.current?.close();
        setItemDataCopy({...itemDataState});
        setIsEditing(true);
    }

    const saveItem = () => {
        setIsEditing(false);
        setItemDataState(itemDataCopy)
        const event = new CustomEvent('itemDataUpdated', { detail: itemDataCopy });
        window.dispatchEvent(event);
    }

    const cancelEdit = () => {
        setIsEditing(false);
    }

    return (
        <IonItemSliding className={styles.textItem} ref={slidingRef}>
            {!isEditing ? <IonItemOptions side="start" onIonSwipe={editItem}>
                    <IonItemOption color="primary">
                        <IonIcon slot="start" icon={settings}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                : null}
            <IonItem className={styles.ionItem}>
                <div className={styles.textItemContent}>
                    {isEditing ? <>
                            <input type="text" className={styles.titleEditInput} value={itemDataCopy.title} onChange={(e) => setItemDataCopy({...itemDataCopy, title: e.target.value})} />
                            <textarea className={styles.textEditInput} value={itemDataCopy.text} onChange={(e) => setItemDataCopy({...itemDataCopy, text: e.target.value})} />
                            <div className={styles.confirmationButtonsContainer}>
                                <button className={styles.confirmButton} onClick={saveItem}>
                                    ✔️
                                </button>
                                <button className={styles.cancelButton} onClick={cancelEdit}>
                                    ❌
                                </button>
                            </div>
                        </>
                        : <>
                        <h2>{itemDataState.title}</h2>
                        <p>{itemDataState.text}</p>
                    </>}
                </div>
            </IonItem>
            {!isEditing ? <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => console.log('Delete clicked')}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                : null}
        </IonItemSliding>
    );
}

export default TextItem;