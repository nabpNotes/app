import './Toolbar.css';
import React, {useState} from "react";

import nabpIcon from '../../assets/icons/nabp.svg';
import backIcon from '../../assets/icons/back.svg';
import navigationIcon from '../../assets/icons/menu.svg';
import {useIonRouter} from "@ionic/react";

interface ToolbarProps {
    searchable: boolean;
    pageTitle: string;
    backButton: boolean;
    toggleMenu: () => void;
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
const Toolbar: React.FC<ToolbarProps> = ({ searchable, pageTitle, backButton, toggleMenu }: ToolbarProps): JSX.Element => {
    const router = useIonRouter();

    const [searchableState, setSearchableState] = useState(searchable);
    const [pageTitleState, setPageTitleState] = useState(pageTitle);
    const [backButtonState, setBackButtonState] = useState(backButton);

    const navigateBack = () => {
        router.goBack();
    }

    return (
        <>
            <div className="toolbarContainer">
                <div className="toolbarIconContainer">
                    {backButton ? (
                        <img className="toolbarBackIcon" src={backIcon} alt="back-icon" onClick={navigateBack} />
                    ) : (
                        <img className="toolbarNabpIcon" src={nabpIcon} alt="menu-icon"  />
                    )}
                    <img src={navigationIcon} alt="menu-icon" onClick={toggleMenu}/>
                </div>
                <div className="toolbarSearchInputContainer">
                    {searchable ? (
                        <input className="toolbarSearchInput" type="text" placeholder="Search" />
                    ) : (
                        <h1>{pageTitle}</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default Toolbar;