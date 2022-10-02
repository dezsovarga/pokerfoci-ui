import React, {useState} from 'react';
import classes from "./UserProfileForm.module.css";
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';

const UserProfileForm = (props) => {

    const newPasswordInputRef = useRef();
    const oldPasswordInputRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredOldPassword = oldPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;

        //TODO: add validation

        fetch("http://localhost:8081/account/change-password", {
            method: 'POST',
            body: JSON.stringify({
                email: authCtx.username,
                oldPassword: enteredOldPassword,
                newPassword: enteredNewPassword
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCtx.token}`
            }
        }).then(res => {
            // assumption: Always succeeds!
            if (res.ok) {
                setSuccessMessage("Password changed successfully!")
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for changing password failed';
                    setErrorMessage(errorMessage);
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
                <div className={classes.action}>
                    <button type="submit">Change Password</button>
                </div>
            </form>
        </section>
    );
}

export default UserProfileForm