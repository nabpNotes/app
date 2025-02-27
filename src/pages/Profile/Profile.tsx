import React from "react";
import styles from  "./Profile.module.css";
import {IonContent, IonFooter, IonHeader, IonPage} from "@ionic/react";
import Toolbar from "../../components/Toolbar/Toolbar";
import placeholderProfilePic from "../../assets/icons/placeholder-profile-pic.svg";


const Profile: React.FC = (): JSX.Element => {
    return (
        <IonPage className='background'>
            <IonHeader className='ionHeader'>
                <Toolbar
                    searchable={false}
                    pageTitle={"Profile Settings"}
                    backButton={true}
                />
            </IonHeader>
            <IonContent className='ionContent'>
                <div className={styles.profileContent}>
                    <div>
                        <img src={placeholderProfilePic} alt={"profile-pic"} className={styles.profilePic}></img>
                    </div>
                    <div>
                        <h2>
                            Rainer
                        </h2>
                        <h6 className={styles.greyTextH6}>
                            Profile Name
                        </h6>
                    </div>
                    <div>
                        <h2>
                            @rainerxoxo
                        </h2>
                        <h6 className={styles.greyTextH6}>
                            Username
                        </h6>
                    </div>
                    <div>
                        <h2>Profile Link</h2>
                        <h6 className={styles.greyTextH6}>
                            https://nabp/profile...
                        </h6>
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <div className={styles.FooterButtonContainer}>
                    <button className={styles.changePasswordButton}>
                        Change Password
                    </button>
                    <button className={styles.deleteAccountButton}>
                        Delete Account
                    </button>
                </div>
            </IonFooter>
        </IonPage>
    );
}

export default Profile;