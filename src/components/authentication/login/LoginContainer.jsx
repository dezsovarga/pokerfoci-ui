import React from 'react';
import { Link } from 'react-router-dom';
import './LoginContainer.css';

const LoginContainer = (props) => {

    const submitHandler = (event) => {
        console.log("loginclicked")

    }

    return (
        <div className="login-form">
                <h3 className="text-center">Sign in to Pokerfoci</h3>       
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </div>
                <div className="clearfix">
                    <label className="float-left form-check-label"><input type="checkbox" /> Remember me</label>
                    <a href="#" className="float-right">Forgot Password?</a>
                </div>        
            </form>
            <p className="text-center">
                <Link className="nav-link" to="/signup">Create an Account</Link>
            </p>
        </div>
    )
}

export default LoginContainer