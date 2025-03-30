import styles from './ChecklistItem.module.css';
import React, {useEffect, useRef, useState} from "react";
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding} from "@ionic/react";
import checkmark from "../../../assets/icons/checkmark.svg";
import cross from "../../../assets/icons/cross.svg";
import trash from "../../../assets/icons/trash.svg";
import pencil from "../../../assets/icons/pencil.svg";

interface ChecklistItemProps {
    itemData: {
        title: string;
        checklistItems: object[];
    };
}

/**
 * This component renders a text item with edit and delete options.
 * @param {TextItemProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered component.
 */
const ChecklistItem: React.FC<ChecklistItemProps> = ({itemData}: ChecklistItemProps): JSX.Element => {
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

    const changeChecked = (updatedItemData: object) => {
        console.log(updatedItemData)
        const event = new CustomEvent('itemDataUpdated', { detail: itemDataState });
        window.dispatchEvent(event);
    }

    return (
        <IonItemSliding className={styles.checklistItem} ref={slidingRef}>
            {!isEditing ? <IonItemOptions side="start" onIonSwipe={editItem}>
                    <IonItemOption color="primary">
                        <IonIcon slot="start" size="large" icon={pencil}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
                : null}
            <IonItem className={styles.ionItem}>
                <div className={styles.checklistItemContent}>
                    {isEditing ? <>
                            <input type="text" className={styles.titleEditInput} value={itemDataCopy.title} onChange={(e) => setItemDataCopy({...itemDataCopy, title: e.target.value})} />
                            {itemDataCopy.checklistItems.map((item: any, index: number) => (
                                <div key={index} className={styles.checklistItem}>
                                    <input
                                        className={styles.checkbox}
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => {
                                            const updatedChecklistItems = [...itemDataCopy.checklistItems];
                                            // @ts-ignore TODO: don't know if this causes problems
                                            updatedChecklistItems[index].checked = !updatedChecklistItems[index].checked;
                                            const updatedItemData = {...itemDataState, checklistItems: updatedChecklistItems};
                                            changeChecked(updatedItemData);
                                        }}
                                    />
                                    <input
                                        className={styles.descriptionEditInput}
                                        type="text"
                                        value={item.checkboxLabel}
                                        onChange={(e) => {
                                            const updatedChecklistItems = [...itemDataCopy.checklistItems];
                                            // @ts-ignore TODO: don't know if this causes problems
                                            updatedChecklistItems[index].checkboxLabel = e.target.value;
                                            setItemDataCopy({...itemDataCopy, checklistItems: updatedChecklistItems});
                                        }}
                                    />
                                </div>
                            ))}
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
                            {itemDataState.checklistItems.map((item: any, index: number) => (
                                <div key={index} className={styles.checklistItem}>
                                    <input
                                        className={styles.checkbox}
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => {
                                            const updatedChecklistItems = [...itemDataState.checklistItems];
                                            // @ts-ignore TODO: don't know if this causes problems
                                            updatedChecklistItems[index].checked = !updatedChecklistItems[index].checked;
                                            const updatedItemData = {...itemDataState, checklistItems: updatedChecklistItems};
                                            changeChecked(updatedItemData);
                                        }}
                                    />
                                    <label>{item.checkboxLabel}</label>
                                </div>
                            ))}
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

export default ChecklistItem;