import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isLoading: false,
        successMessage: '',
        errorMessage: ''
    },
    reducers: {
        changePasswordRequest(state) {
            state.isLoading = true;
            state.successMessage = '';
            state.errorMessage = '';
        },

        changePasswordSuccess(state, action) {
            state.isLoading = false;
            state.successMessage = action.payload.successMessage;
            state.errorMessage = '';
        },

        changePasswordFailure(state, action) {
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage;
        }
    }
});

export const profileActions = profileSlice.actions;
export default profileSlice;