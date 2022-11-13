import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './login-slice';
import signupSlice from './signup-slice';
import accountActivationSlice from "./account-activation-slice";
import profileSlice from "./profile-slice";

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        signup: signupSlice.reducer,
        accountActivation: accountActivationSlice.reducer,
        profile: profileSlice.reducer
    }
});

export default store;