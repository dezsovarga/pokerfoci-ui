import React from 'react';
import classes from './UserProfile.module.css';
import avatarIcon from "../../assets/avatar.png";
import UserProfileForm from "./UserProfileForm";
import {useSelector} from "react-redux";

const UserProfile = (props) => {

    const username = useSelector(state => state.login.username)

    return (
        <section className={classes.starting}>
            <img className={classes.avatarIcon} alt="avatar-icon" src={avatarIcon} data-testid='avatar-icon'/>
            <h3 data-testid='logged-in-username'>{username}</h3>
            <UserProfileForm />
        </section>
    )
}

export default UserProfile