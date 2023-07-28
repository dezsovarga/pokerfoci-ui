import React from 'react';
import classes from './ConfirmSignup.module.css';
import confirmIcon from '../../../assets/check.png';
import { Link } from 'react-router-dom';

const ConfirmSignup = (props) => {
    return (
        <div>
            <h2 className={classes.title}>Your signup request has been recieved</h2>
            <img className={classes.confirmIcon} src={confirmIcon} alt="confirm-icon" data-testid='confirm-icon'/>
            <div className={classes.subtitle}>Thank you for your registration</div>

            <div className={classes.confirmContent}>
                You will receive a confirmation email with a verification link <br/>
            </div>

            <Link className="nav-link" to={`/activate-account/${props.confirmToken}`} data-testid='activate-account-button'>
                <button className="btn btn-primary" >
                    Activate your account
                </button>
            </Link>
        </div>
    )
}

export default ConfirmSignup;