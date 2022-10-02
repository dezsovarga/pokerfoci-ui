import React, {useContext} from 'react';
import classes from './UserProfile.module.css';
import avatarIcon from "../../assets/avatar.png";
import AuthContext from "../../store/auth-context";
import UserProfileForm from "./UserProfileForm";



const UserProfile = (props) => {

    const authCtx = useContext(AuthContext);

    return (
        <section className={classes.starting}>
            <img className={classes.avatarIcon} src={avatarIcon} />
            <h3>{authCtx.username}</h3>
            <UserProfileForm />
        </section>


    )
}

export default UserProfile