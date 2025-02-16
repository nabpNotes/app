import './Home.css';
import React from "react";
import Toolbar from '../components/Toolbar/Toolbar';
import GroupListItem from '../components/GroupListItem/GroupListItem';

/**
 * Home page
 * @returns {JSX.Element}
 * This page is the home page of the application.
 * It displays the groups the user is a member of.
 **/
const Home: React.FC = () => {
  return (
      <div className="background">
          <Toolbar
              searchable={true}
              pageTitle={"WG Uni 🏚️"}
              backButton={false}
          />
          <div className="groupList">
              <GroupListItem
                    type={"group"}
                    title={"WG Uni 🏚️"}
              />
              <GroupListItem
                  type={"group"}
                  title={"Werkstatt 🪛"}
              />
              <GroupListItem
                  type={"group"}
                  title={"Legenden 🏆"}
              />
          </div>
      </div>
  );
};

export default Home;
