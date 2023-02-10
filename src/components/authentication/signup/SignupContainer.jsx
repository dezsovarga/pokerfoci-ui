import React, { useRef } from 'react';
import './SignupContainer.css';
import { Link } from 'react-router-dom';
import ConfirmSignup from './ConfirmSignup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {signupActions} from "../../../store/signup-slice";

const SignupContainer = (props) => {

    const dispatch = useDispatch();
    const userNameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const signupSuccessful = useSelector(state => state.signup.signupSuccessful)
    const confirmToken = useSelector(state => state.signup.confirmToken)
    const validationError = useSelector(state => state.signup.validationError)
    const isLoading = useSelector(state => state.signup.isLoading)

    const submitHandler = (event) => {
        event.preventDefault();

        const accountDto = {
            username: userNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        }
        if (accountDto.password !== accountDto.confirmPassword) {
            dispatch(signupActions.signupFailure({
                validationError: "Password and confirmPassword do not match!"
            }));
        } else{
            const registerRequest = {
                accountDto: accountDto
            }
            onSignupHandler(registerRequest)
        }        
    }

    async function onSignupHandler(account) {
        dispatch(signupActions.signupRequest());

        const response = await fetch('http://localhost:8081/account/register', {
          method: 'POST',
          body: JSON.stringify(account),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(signupActions.signupSuccess({
                confirmToken: data.confirmToken
            }));
        }
        if (!response.ok) {
            const data = await response.json();
            dispatch(signupActions.signupFailure({
                validationError: data.reason
            }));
        }
    }

    if (signupSuccessful) {
        return <ConfirmSignup confirmToken={confirmToken}/>
    } else {
        return (

            <div className="signup-form" data-testid='signup-form'>
                <h3>Sign Up to Pokerfoci</h3>
                <p className="error" data-testid='validation-error'> {validationError} </p>
                <form onSubmit={submitHandler}>
                    
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" placeholder="Username" required="required" ref={userNameRef}/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" name="email" placeholder="Email Address" required="required" ref={emailRef}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password" required="required" ref={passwordRef}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required" ref={confirmPasswordRef}/>
                    </div>        
                    <div className="form-group">
                        <label className="form-check-label"><input type="checkbox" required="required" /> 
                        I accept the <a href="privacy-policy">Terms of Use</a> &amp; <a href="privacy-policy">Privacy Policy</a></label>
                    </div>
                    {/*TODO: add loading spinner*/}
                    {isLoading && <div>Loading...</div>}
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" data-testid='signup-button'>Sign Up</button>
                    </div>
                </form>
                <div className="text-center">Already have an account? 
                    <Link className="nav-link" to="/login" data-testid='login-here-link'>Login here</Link>
                </div>
            </div>
        )
    }
}

export default SignupContainer