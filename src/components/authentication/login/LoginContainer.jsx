import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginContainer.css';
import { loginActions } from '../../../store/login-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { REACT_APP_API_URL} from "../../../Constants";

const LoginContainer = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const isLoading = useSelector(state => state.login.isLoading);
    const authError = useSelector(state => state.login.authError);

    const submitHandler = (event) => {
        event.preventDefault();

        dispatch(loginActions.loginRequest());
        const username = emailRef.current.value;
        const password = passwordRef.current.value;
        const encoded = btoa(`${username}:${password}`);

        const url = `${REACT_APP_API_URL}/account/login`
        fetch(url, {
            method: 'POST',
            body: null,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encoded}`
            },
          })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = data.reason || 'Authentication failed!';
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            const decodedBearerToken = JSON.parse(atob(data.bearerToken));
            dispatch(loginActions.loginSuccess({
                username: decodedBearerToken.username,
                token: decodedBearerToken.token,
                roles: data.roles
            }));
            navigate("/home", { replace: true });
          })
          .catch((err) => {
              dispatch(loginActions.loginFailure({
                  authError: err.message,
              }));
          });
    }

    return (
        <div className="login-form" data-testid='login-form'>
            <h3 className="text-center">Sign in to Pokerfoci</h3>
            <p className="error">{authError}</p>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" required="required" ref={emailRef} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required="required" ref={passwordRef} />
                </div>
                {/*TODO: add loading spinner*/}
                {isLoading && <div>Loading...</div>}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" data-testid='login-button'>Log in</button>
                </div>
                <div className="clearfix">
                    <label className="float-left form-check-label"><input type="checkbox" /> Remember me</label>
                    <a href="forgot-password" className="float-right">Forgot Password?</a>
                </div>
            </form>
            <p className="text-center">
                <Link className="nav-link" to="/signup" data-testid='signup-link'>Create an Account</Link>
            </p>
        </div>
    )
}

export default LoginContainer