import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        confirmToken: '',
        signupSuccessful: false,
        isLoading: false,
        validationError: ''
    },
    reducers: {
        signupRequest(state) {
            state.isLoading = true;
            state.validationError = '';
        },

        signupSuccess(state, action) {
            state.isLoading = false;
            state.signupSuccessful = true;
            state.confirmToken = action.payload.confirmToken;
            state.validationError = '';
        },

        signupFailure(state, action) {
            state.isLoading = false;
            state.validationError = action.payload.validationError;
            state.signupSuccessful = false;
        },

        clearSignupData(state) {
            state.confirmToken = '';
            state.signupSuccessful = false;
            state.isLoading = false;
            state.validationError = ''
        }
    }
});

export const signupActions = signupSlice.actions;
export default signupSlice;
