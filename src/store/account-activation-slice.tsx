import { createSlice } from '@reduxjs/toolkit';

const activateAccountSlice = createSlice({
    name: 'activateAccount',
    initialState: {
        accountActivated: false,
        alreadyConfirmed: false,
        isLoading: false,
        activationError: ''
    },
    reducers: {
        confirmRequest(state) {
            state.isLoading = true;
            state.activationError = '';
        },

        confirmSuccess(state, action) {
            state.isLoading = false;
            state.accountActivated = true;
            state.activationError = '';
        },

        confirmFailure(state, action) {
            state.alreadyConfirmed = action.payload.alreadyConfirmed;
            state.isLoading = false;
            state.activationError = action.payload.activationError;
            state.accountActivated = false;
        }
    }
});

export const activateAccountActions = activateAccountSlice.actions;
export default activateAccountSlice;