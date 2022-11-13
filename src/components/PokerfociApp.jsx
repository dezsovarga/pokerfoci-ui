import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginContainer from './authentication/login/LoginContainer.jsx'
import SignupContainer from './authentication/signup/SignupContainer.jsx'
import ActivateAccount from './authentication/signup/ActivateAccount.jsx'
import Header from './home/Header.jsx'
import Home from './home/Home.jsx'
import Statistics from './home/Statistics.jsx'
import Skills from "./home/Skills";
import UserProfile from "./profile/UserProfile";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {loginActions} from "../store/login-slice";


const PokerfociApp = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loginActions.loginSuccess({
            token: localStorage.getItem('token'),
            username: localStorage.getItem('username'),
        }));
    }, []);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn)
    return (
        <div>
            <Router>
                <>
                    <Header/> 
                    <Routes>
                        {isLoggedIn && <Route path="/" exact element={<Home/>}/> }
                        {!isLoggedIn && <Route path="/login" element={<LoginContainer/>}/> }
                        {!isLoggedIn && <Route path="/signup" element={<SignupContainer/>}/> }
                        <Route path="/activate-account/:confirmToken" element={<ActivateAccount/>}/>
                        {isLoggedIn && <Route path="/home" element={<Home/>}/> }
                        {isLoggedIn && <Route path="/statistics" element={<Statistics/>}/> }
                        {isLoggedIn && <Route path="/skills" element={<Skills/>}/> }
                        {isLoggedIn && <Route path="/user-profile" element={<UserProfile/>}/> }
                        {/*<AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>

                        <Route component={ErrorComponent}/> */}
                    </Routes>
                    {/* <FooterComponent/> */}
                </>
            </Router>
            {/* <LoginContainer/> */}
        </div>
    )
}

export default PokerfociApp