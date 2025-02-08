import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React from "react";
import Toolbar from '../components/Toolbar/Toolbar';

const Home: React.FC = () => {
  return (
      <div className="background">
          <Toolbar
                searchable={true}
                pageTitle={"WG Uni 🏚️"}
                backButton={false}
          />
      </div>
  );
};

export default Home;
