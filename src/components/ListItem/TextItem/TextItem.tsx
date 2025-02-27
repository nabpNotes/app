import styles from './TextItem.module.css';
import React, {useState} from "react";

interface TextItemProps {
    itemData: {
        title: string;
        text: string;
    };
}

const TextItem: React.FC<TextItemProps> = ({itemData}: TextItemProps): JSX.Element => {
    const [itemDataState, setItemDataState] = useState(itemData);

    return (
        <div className={styles.textItem}>
            <h2>{itemDataState.title}</h2>
            <p>{itemDataState.text}</p>
        </div>
    );
}

export default TextItem;