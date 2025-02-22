import "./GroupListItem.css";
import React from "react";
import {useIonRouter} from "@ionic/react";

interface GroupListItemProps {
    itemId: string;
    type: 'group' | 'list';
    title: string;
}

/**
 * GroupListItem component
 * @param {string} itemId - The id of the group
 * @param {string} type - The type of the group
 * @param {string} title
 * @returns {JSX.Element}
 * This component is used to display a group/list item.
 */
const GroupListItem: React.FC<GroupListItemProps> = ({itemId, type, title }: GroupListItemProps): JSX.Element => {
    const router = useIonRouter();

    const redirect = () => {
        if (type === 'group') {
            router.push(`/group/${itemId}`);
        } else {
            router.push(`/list/${itemId}`);
        }
    }

    return (
        <div className="groupListItem" onClick={redirect}>
            <div className="groupListItemTitleContainer">
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default GroupListItem;