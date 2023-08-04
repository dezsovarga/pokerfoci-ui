import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    username: '',
    isLoggedIn: false,
    login: (token, username) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const initialUsername = localStorage.getItem('username');

    const [token, setToken] = useState(initialToken);
    const [username, setUsername] = useState(initialUsername);

    const isUserLoggedIn = !!token;

    const loginHandler = (token, username) => {
        setToken(token);
        setUsername(username);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    const contextValue = {
        token: token,
        username: username,
        isLoggedIn: isUserLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;