import "./GroupListItem.css";
import React from "react";

interface GroupListItemProps {
    type: 'group' | 'list';
    title: string;
}

/**
 * GroupListItem component
 * @param {string} type
 * @param {string} title
 * @returns {JSX.Element}
 * This component is used to display a group/list item.
 */
const GroupListItem: React.FC<GroupListItemProps> = ({ type, title }: GroupListItemProps): JSX.Element => {
    return (
        <div className="groupListItem">
            <div className="groupListItemTitleContainer">
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default GroupListItem;