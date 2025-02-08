import './Toolbar.css';
import React, {useState} from "react";

import nabpIcon from '../../assets/icons/nabp.svg';
import backIcon from '../../assets/icons/back.svg';

interface ToolbarProps {
    searchable: boolean;
    pageTitle: string;
    backButton: boolean;
}

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
                    textAlign: "right",                 //kann ganz ersetzt werden
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