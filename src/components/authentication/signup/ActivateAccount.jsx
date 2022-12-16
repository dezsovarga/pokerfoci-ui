import { useEffect } from "react";
import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './ConfirmSignup.module.css';
import confirmIcon from '../../../assets/check.png';
import wrongIcon from '../../../assets/red-x.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {activateAccountActions} from "../../../store/account-activation-slice";
import {loginActions} from "../../../store/login-slice";
import {signupActions} from "../../../store/signup-slice";

const ActivateAccount = (props) => {

    const dispatch = useDispatch();
    const { confirmToken } = useParams();

    const loading = useSelector(state => state.accountActivation.isLoading);
    const alreadyConfirmed = useSelector(state => state.accountActivation.alreadyConfirmed);
    const error = useSelector(state => state.accountActivation.activationError)

    async function activateAccount(confirmToken) {

      dispatch(activateAccountActions.confirmRequest());

      const response = await fetch(`http://localhost:8081/account/register/confirm/${confirmToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.status !== 200) {
          dispatch(activateAccountActions.confirmFailure({
              activationError: data.reason
          }));
          if (response.status === 409) {
              dispatch(activateAccountActions.confirmFailure({
                  alreadyConfirmed: true
              }));
          }
      } else {
          dispatch(activateAccountActions.confirmSuccess());
          dispatch(signupActions.clearSignupData());
          dispatch(loginActions.loginSuccess({
              username: data.username,
              token: data.bearerToken,
              roles: data.roles,
          }));
      }
    }

    useEffect(() => {
        activateAccount(confirmToken);
    }, []);

    const SuccesfullyConfirmed = () => {
      return (
        <section>
          <h2 className={classes.title} data-testid='confirmed-successfully'>Congratulations! Your account has been confirmed successfully!</h2>
          <img alt="confirmIcon" className={classes.confirmIcon} src={confirmIcon} data-testid='confirm-activation-icon'/>
          <div className={classes.subtitle}>You can now login in the application</div>
        </section>
      );
    }

    const AlreadyConfirmed = () => {
      return (
          <h2 className={classes.title}>Your account has already been confirmed!</h2>
      );
    }

    const InvalidToken = () => {
      return (
        <section>
          <h2 className={classes.title}>Something went wrong</h2>
          <img alt="wrongIcon" className={classes.confirmIcon} src={wrongIcon} />
          <div className={classes.subtitle}>{error}</div>
        </section>
      );
    }

    const ConfirmationFeedback = () => {
      return (
        <section>
          {alreadyConfirmed && <AlreadyConfirmed></AlreadyConfirmed>}
          {!alreadyConfirmed && !error && <SuccesfullyConfirmed></SuccesfullyConfirmed>}
          {error && <InvalidToken />}

          {!error && <Link className="nav-link" to={`/home`} data-testid='continue-to-homepage-button'>
                <button type="submit" className="btn btn-primary"> 
                    Continue to homepage
                </button>
            </Link>}
        </section>
      );
    }

    return (
      <React.Fragment>
        {loading && <p>Loading...</p>}
        {!loading && <ConfirmationFeedback></ConfirmationFeedback>}
        
      </React.Fragment>
    );
}

export default ActivateAccount;