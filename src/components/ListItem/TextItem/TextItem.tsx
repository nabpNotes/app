import styles from './TextItem.module.css';
import React, {useEffect, useRef, useState} from "react";
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding} from "@ionic/react";
import checkmark from "../../../assets/icons/checkmark.svg";
import cross from "../../../assets/icons/cross.svg";
import trash from "../../../assets/icons/trash.svg";
import pencil from "../../../assets/icons/pencil.svg";

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
                        <IonIcon slot="start" size="large" icon={pencil}></IonIcon>
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
                                    <img className={styles.confirmationButtonIcons} src={checkmark} alt="checkmark" />
                                </button>
                                <button className={styles.cancelButton} onClick={cancelEdit}>
                                    <img className={styles.confirmationButtonIcons} src={cross} alt="cross" />
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
                        <IonIcon slot="icon-only" size="large" icon={trash}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                : null}
        </IonItemSliding>
    );
}

export default TextItem;