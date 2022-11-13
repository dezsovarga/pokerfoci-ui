import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {loginActions} from "../../store/login-slice";

const Header = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const isUserLoggedIn = useSelector(state => state.login.isLoggedIn)

    const logoutHandler = () => {
        dispatch(loginActions.logout());
        navigate("/login", { replace: true });
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <h2 className="navbar-brand"> 
                    <Link className="nav-link" to="/">Pokerfoci</Link> </h2>

                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {isUserLoggedIn && <li><Link className="nav-link" to="/home">Home</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/statistics">Statistics</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/skills">Skills</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/past-events">Past events</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/user-profile">User profile</Link></li>}

                    {!isUserLoggedIn && <li><Link className="nav-link" to="/login" data-testid='login-link'>Login</Link></li>}

                    {isUserLoggedIn && <li> <button onClick={logoutHandler}>Logout</button> </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header