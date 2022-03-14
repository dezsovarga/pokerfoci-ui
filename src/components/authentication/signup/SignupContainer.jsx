import React, { Component } from 'react';
import './SignupContainer.css';
import { Link } from 'react-router-dom';


class SignupContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.signupClicked = this.signupClicked.bind(this)
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    signupClicked() {
//             AuthenticationService
//                 .executeJwtAuthenticationService(this.state.username, this.state.password)
//                 .then((response) => {
//                     AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
//                     this.props.history.push(`/welcome/${this.state.username}`)
//                 }).catch(() => {
//                     this.setState({ showSuccessMessage: false })
//                     this.setState({ hasLoginFailed: true })
//                 })
        console.log("signupclicked")

    }

    
    render() {
        return (
            // <div>
            //     <h1>Login</h1>
            //     <div className="container">
            //         {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
            //         {this.state.showSuccessMessage && <div>Login Sucessful</div>}
            //         User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
            //         Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
            //         <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            //     </div>
            // </div>
            <div className="signup-form">
                <h3>Sign Up to Pokerfoci</h3>
                <form action="/examples/actions/confirmation.php" method="post">
                    
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
}

export default SignupContainer