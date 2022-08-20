import { useEffect, useState, useContext } from "react";
import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './ConfirmSignup.module.css';
import confirmIcon from '../../../assets/check.png';
import wrongIcon from '../../../assets/red-x.png';
import AuthContext from "../../../store/auth-context";

import { Link } from 'react-router-dom';

const ActivateAccount = (props) => {

    const authCtx = useContext(AuthContext);
    const { confirmToken } = useParams();
    const [loading, setLoading] = useState(false); 
    const [alreadyConfirmed, setAlreadyConfirmed] = useState(false); 
    const [error, setError] = useState(""); 

    async function activateAccount(confirmToken) {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/account/register/confirm/${confirmToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.status !== 200) {
        setError(data.reason);
        if (response.status === 409) {
          setAlreadyConfirmed(true);
        }
      }
      authCtx.login(data.bearerToken);
    }

    useEffect(() => {
        activateAccount(confirmToken);
    }, []);  

    const SuccesfullyConfirmed = () => {
      return (
        <section>
          <h2 className={classes.title}>Congratulations! Your account has been confirmed succesfully!</h2>
          <img alt="confirmIcon" className={classes.confirmIcon} src={confirmIcon} />
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

          {/* //TODO: create homepage page */}
          {!error && <Link className="nav-link" to={`/home`}>
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