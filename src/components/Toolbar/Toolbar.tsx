import './Toolbar.css';
import React, {useState} from "react";
import {IonPage} from "@ionic/react";

import nabpIcon from '../../assets/icons/nabp.svg';
import backIcon from '../../assets/icons/back.svg';

interface ToolbarProps {
    searchable: boolean;
    pageTitle: string;
    backButton: boolean;
}

/**
 * Toolbar component
 * @param {boolean} searchable - boolean to determine if search input should be displayed
 * @param {string} pageTitle - string to display as page title
 * @param {boolean} backButton - boolean to determine if back button should be displayed
 * @returns {JSX.Element}
 * This component is used to display the toolbar at the top of the page.
 * the toolbar should be used in every page with various states.
 **/
const Toolbar: React.FC<ToolbarProps> = ({ searchable, pageTitle, backButton }) => {
    const [searchableState, setSearchableState] = useState(searchable);
    const [pageTitleState, setPageTitleState] = useState(pageTitle);
    const [backButtonState, setBackButtonState] = useState(backButton);

    return (
        <div className="toolbarContainer">
            <div className="toolbarIconContainer">
                {backButton ? <img className="toolbarBackIcon" src={backIcon} alt="back-icon"/>
                    : <img className="toolbarNabpIcon" src={nabpIcon} alt="menu-icon"/>
                }
            </div>
            <div>
                <p style={{
                    textAlign: "right",                 //TODO kann ganz ersetzt werden
                    color: "white",
                }}>Placeholder für navigator</p>
            </div>
            <div className="toolbarSearchInputContainer">
                {searchable ? <input className="toolbarSearchInput" type="text" placeholder="Search"/>
                    : <h1>{pageTitle}</h1>
                }
            </div>
        </div>
    );
}

export default Toolbar;