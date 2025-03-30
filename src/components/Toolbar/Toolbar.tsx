import styles from './Toolbar.module.css';
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
    searchItems: string[];
    onSearch: (filteredData: string[]) => void;
}

/**
 * Toolbar component
 * @param {boolean} searchable - boolean to determine if search input should be displayed
 * @param {string} pageTitle - string to display as page title
 * @param {boolean} backButton - boolean to determine if back button should be displayed
 * @param toggleMenu
 * @param searchItems - the items in which the searchbar filters
 * @param onSearch - the handler function for the search event
 * @returns {JSX.Element}
 * This component is used to display the toolbar at the top of the page.
 * the toolbar should be used in every page with various states.
 **/
const Toolbar: React.FC<ToolbarProps> = ({ searchable, pageTitle, backButton, toggleMenu, searchItems, onSearch }: ToolbarProps): JSX.Element => {
    const router = useIonRouter();

    const [searchableState, setSearchableState] = useState(searchable);
    const [pageTitleState, setPageTitleState] = useState(pageTitle);
    const [backButtonState, setBackButtonState] = useState(backButton);
    const [inputText, setInputText] = useState("");

    const navigateBack = () => {
        router.goBack();
    }

    /**
     * This function handles the search event and searches for a substring
     * @param e the string for which is searched
     */
    const handleSearch = (e: { target: { value: string; }; }) => {
        let str = e.target.value.toLowerCase();
        setInputText(str);

        const filteredData = searchItems.filter((a) => {
           if (str === '') {
               return searchItems;
           } else {
               return a.toLowerCase().includes(str);
           }
        });

        onSearch(filteredData);
    }

    return (
        <>
            <div className={styles.toolbarContainer}>
                <div className={styles.toolbarIconContainer}>
                    {backButton ? (
                        <img className={styles.toolbarBackIcon} src={backIcon} alt="back-icon" onClick={navigateBack} />
                    ) : (
                        <img className={styles.toolbarNabpIcon} src={nabpIcon} alt="menu-icon"  />
                    )}
                    <img src={navigationIcon} alt="menu-icon" onClick={toggleMenu}/>
                </div>
                <div className={styles.toolbarSearchInputContainer}>
                    {searchable ? (
                        <input className={styles.toolbarSearchInput}
                               type="text"
                               placeholder="Search"
                               onChange={handleSearch} />
                    ) : (
                        <h1>{pageTitle}</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default Toolbar;