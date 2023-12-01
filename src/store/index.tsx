import {combineReducers, configureStore} from '@reduxjs/toolkit';
import loginSlice from './login-slice';
import signupSlice from './signup-slice';
import accountActivationSlice from "./account-activation-slice";
import profileSlice from "./profile-slice";
import adminSlice from "./admin-slice";
import latestEventSlice from "./latest-event-slice";

const rootReducer = combineReducers({
    login: loginSlice.reducer,
    signup: signupSlice.reducer,
    accountActivation: accountActivationSlice.reducer,
    profile: profileSlice.reducer,
    admin: adminSlice.reducer,
    latestEvent: latestEventSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
});

export default store;