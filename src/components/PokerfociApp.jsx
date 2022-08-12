import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginContainer from './authentication/login/LoginContainer.jsx'
import SignupContainer from './authentication/signup/SignupContainer.jsx'
import ActivateAccount from './authentication/signup/ActivateAccount.jsx'


const PokerfociApp = (props) => {

    return (
        <div className="TodoApp">
            <Router>
                <>
                    {/* <HeaderComponent/> */}
                    <Routes>
                        <Route path="/" exact element={<LoginContainer/>}/>
                        <Route path="login" element={<LoginContainer/>}/>
                        <Route path="/signup" element={<SignupContainer/>}/>
                        <Route path="/activate-account/:confirmToken" element={<ActivateAccount/>}/>

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