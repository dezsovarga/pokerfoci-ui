import React, { useRef, useState } from 'react';
import './SignupContainer.css';
import { Link } from 'react-router-dom';
import ConfirmSignup from './ConfirmSignup';

const SignupContainer = (props) => {

    const userNameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');  

    const [signupConfirmed, setSignupConfirmed] = useState(false);
    const [confirmToken, setConfirmToken] = useState("");
    const [validationError, setValidationError] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("signupclicked")

        const accountDto = {
            username: userNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        }
        if (accountDto.password !== accountDto.confirmPassword) {
            setValidationError("Password and confirmPassword do not match!");
        } else{
            const registerRequest = {
                accountDto: accountDto
            }
            onSignupHandler(registerRequest)
        }        
    }

    async function onSignupHandler(account) {
        const response = await fetch('http://localhost:8081/account/register', {
          method: 'POST',
          body: JSON.stringify(account),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
            const data = await response.json();
            setSignupConfirmed(true);
            setConfirmToken(data.confirmToken);
        }
        if (response.status !== 200) {
            const data = await response.json();
            setValidationError(data.reason);
        }
      }  

    if (signupConfirmed) {
        return <ConfirmSignup confirmToken={confirmToken}/>
    } else {
        return (

            <div className="signup-form">
                <h3>Sign Up to Pokerfoci</h3>
                <p className="error">{validationError}</p>
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
                        I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </form>
                <div className="text-center">Already have an account? 
                    <Link className="nav-link" to="/login">Login here</Link>
                </div>
            </div>
        )
    }
}

export default SignupContainer