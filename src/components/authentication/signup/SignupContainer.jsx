import React from 'react';
import './SignupContainer.css';
import { Link } from 'react-router-dom';

const SignupContainer = (props) => {

    const submitHandler = (event) => {
        console.log("signupclicked")
    
    }

    return (

        <div className="signup-form">
            <h3>Sign Up to Pokerfoci</h3>
            <form onSubmit={submitHandler}>
                
                <div className="form-group">
                    <input type="text" className="form-control" name="username" placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" name="email" placeholder="Email Address" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
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

export default SignupContainer