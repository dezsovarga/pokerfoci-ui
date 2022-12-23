import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {loginActions} from "../../store/login-slice";

const Header = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const isUserLoggedIn = useSelector(state => state.login.isLoggedIn)
    const userRoles = useSelector(state => state.login.roles)
    const isUserAdmin = userRoles.includes("ROLE_ADMIN");

    const logoutHandler = () => {
        dispatch(loginActions.logout());
        navigate("/login", { replace: true });
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <h2 className="navbar-brand"> 
                    <Link className="nav-link" to="/" data-testid='header-pokerfoci'>Pokerfoci</Link> </h2>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                         aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/home" data-testid='home-link'>Home</Link> </li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/statistics">Statistics</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/skills">Skills</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/past-events">Past events</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/user-profile">User profile</Link></li>}
                        {isUserLoggedIn && isUserAdmin && <li><Link className="nav-link" to="/admin-page" data-testid='admin-page-link' >Admin page</Link></li>}

                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login" data-testid='login-link'>Login</Link></li>}

                        {isUserLoggedIn && <li> <button onClick={logoutHandler} data-testid='logout-button'>Logout</button> </li>}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header