import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginContainer.css';

class LoginContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
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

    loginClicked() {
//             AuthenticationService
//                 .executeJwtAuthenticationService(this.state.username, this.state.password)
//                 .then((response) => {
//                     AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
//                     this.props.history.push(`/welcome/${this.state.username}`)
//                 }).catch(() => {
//                     this.setState({ showSuccessMessage: false })
//                     this.setState({ hasLoginFailed: true })
//                 })
        console.log("loginclicked")

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
            <div className="login-form">
                    <h3 className="text-center">Sign in to Pokerfoci</h3>       
                <form action="/examples/actions/confirmation.php" method="post">
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
}

export default LoginContainer