import { useEffect, useState } from "react";
import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './ConfirmSignup.module.css';
import confirmIcon from '../../../assets/check.png';
import { Link } from 'react-router-dom';

const ActivateAccount = (props) => {

    const { confirmToken } = useParams();
    const [loading, setLoading] = useState(true); 

    async function activateAccount(confirmToken) {
        const response = await fetch(`http://localhost:8081/account/register/confirm/${confirmToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        setLoading(false);
        //TODO: forward to activation confirmed or homepage page
    }

    useEffect(() => {
        activateAccount(confirmToken);
    }, []);  

    const SuccesfullyConfirmed = () => {
      return (
        <section>
          <h2 className={classes.title}>Congratulations! Your account has been confirmed succesfully!</h2>
          <img className={classes.confirmIcon} src={confirmIcon} />
          <div className={classes.subtitle}>You can now login in the appiication</div>
          <Link className="nav-link" to={`/home`}>
                <button type="submit" className="btn btn-primary"> 
                    Continue to homepage
                </button>
            </Link>
        </section>
      );
    }

    return (
      <React.Fragment>
        {loading && <SuccesfullyConfirmed></SuccesfullyConfirmed>}
        
      </React.Fragment>
    );
}

export default ActivateAccount;