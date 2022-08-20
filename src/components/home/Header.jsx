import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const Header = (props) => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    
    const isUserLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
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
                    {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}

                    {isUserLoggedIn && <li> <button onClick={logoutHandler}>Logout</button> </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header