import React from 'react';
import classes from "./UserProfileForm.module.css";
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {profileActions} from "../../store/profile-slice";

const UserProfileForm = (props) => {

    const dispatch = useDispatch();
    const newPasswordInputRef = useRef();
    const oldPasswordInputRef = useRef();
    const isLoading = useSelector(state => state.profile.isLoading);
    const {token, username} = useSelector(state => state.login);
    const {errorMessage, successMessage} = useSelector(state => state.profile);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredOldPassword = oldPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;

        //TODO: add validation
        dispatch(profileActions.changePasswordRequest());

        fetch(`${REACT_APP_API_URL}/account/change-password`, {
            method: 'POST',
            body: JSON.stringify({
                email: username,
                oldPassword: enteredOldPassword,
                newPassword: enteredNewPassword
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            // assumption: Always succeeds!
            if (res.ok) {
                dispatch(profileActions.changePasswordSuccess({
                    successMessage: "Password changed successfully!"
                }));
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for changing password failed';
                    dispatch(profileActions.changePasswordFailure({
                        errorMessage: errorMessage
                    }));
                });
            }
        });
    }

    return (
        <section>
            <form className={classes.form} onSubmit={submitHandler}>
                <p className={classes.error}>{errorMessage}</p>
                <p className={classes.success}>{successMessage}</p>

                <div className={classes.control}>
                    <label htmlFor='old-password'>Old Password</label>
                    <input type='password' id='old-password' minLength="3" ref={oldPasswordInputRef}/>
                    <label htmlFor='new-password'>New Password</label>
                    <input type='password' id='new-password' minLength="3" ref={newPasswordInputRef}/>
                </div>
                {/*TODO: add loading spinner*/}
                {isLoading && <div>Loading...</div>}
                <div className={classes.action}>
                    <button type="submit" data-testid='change-password-button'>Change Password</button>
                </div>
            </form>
        </section>
    );
}

export default UserProfileForm