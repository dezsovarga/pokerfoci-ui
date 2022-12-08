import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        isLoggedIn: false,
        isLoading: false,
        authError: ''
    },
    reducers: {
        loginRequest(state) {
            state.isLoading = true;
            state.authError = '';
        },

        loginSuccess(state, action) {
            state.isLoading = false;
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isLoggedIn = !!action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('username', action.payload.username);
            state.authError = '';
        },

        loginFailure(state, action) {
            state.isLoading = false;
            state.authError = action.payload.authError;
        },

        logout(state) {
            state.token = '';
            state.isLoggedIn = false;
            state.username = '';
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice;