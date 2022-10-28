import React , {useState, useRef, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginContainer.css';
import AuthContext from "../../../store/auth-context";

const LoginContainer = (props) => {

    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();

        setIsLoading(true);
        setAuthError('');
        const username = emailRef.current.value;
        const password = passwordRef.current.value;
        const encoded = btoa(`${username}:${password}`);

        const url = "http://localhost:8081/account/login"
        fetch(url, {
            method: 'POST',
            body: null,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encoded}`
            },
          })
          .then((res) => {
            setIsLoading(false);
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
            authCtx.login(decodedBearerToken.token, decodedBearerToken.username);
            navigate("/home", { replace: true });
          })
          .catch((err) => {
              setAuthError(err.message);
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
                {isLoading && <div>Loading...</div>}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </div>
                <div className="clearfix">
                    <label className="float-left form-check-label"><input type="checkbox" /> Remember me</label>
                    <a href="#" className="float-right">Forgot Password?</a>
                </div>        
            </form>
            <p className="text-center">
                <Link className="nav-link" to="/signup" data-testid='signup-link'>Create an Account</Link>
            </p>
        </div>
    )
}

export default LoginContainer