import styles from './TextItem.module.css';
import React, {useEffect, useRef, useState} from "react";
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding} from "@ionic/react";
import { trash, settings } from 'ionicons/icons'; //TODO: Change Icon

interface TextItemProps {
    itemData: {
        title: string;
        text: string;
    };
}

const TextItem: React.FC<TextItemProps> = ({itemData}: TextItemProps): JSX.Element => {
    const [itemDataState, setItemDataState] = useState(itemData);
    const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

    const editItem = () => {
        console.log('Edit clicked');
    }

    return (
     <IonItemSliding className={styles.textItem} ref={slidingRef}>
         <IonItemOptions side="start" onIonSwipe={() => {slidingRef.current?.close(); editItem()}}>
             <IonItemOption color="primary">
                 <IonIcon slot="start" icon={settings}></IonIcon>
             </IonItemOption>
         </IonItemOptions>
         <IonItem className={styles.ionItem}>
             <div>
                 <h2>{itemDataState.title}</h2>
                 <p>{itemDataState.text}</p>
             </div>
         </IonItem>
         <IonItemOptions side="end">
             <IonItemOption color="danger" onClick={() => console.log('Delete clicked')}>
                 <IonIcon slot="icon-only" icon={trash}></IonIcon>
             </IonItemOption>
         </IonItemOptions>
     </IonItemSliding>
    );
}

export default TextItem;