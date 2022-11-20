import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import loginSlice from '../store/login-slice';
import signupSlice from '../store/signup-slice';
import accountActivationSlice from "../store/account-activation-slice";
import profileSlice from "../store/profile-slice";

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                login: loginSlice.reducer,
                signup: signupSlice.reducer,
                accountActivation: accountActivationSlice.reducer,
                profile: profileSlice.reducer
            },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
