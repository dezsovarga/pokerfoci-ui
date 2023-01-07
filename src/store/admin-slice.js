import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        accounts: {
            accountData: [],
            isLoading: false,
            loadingError: ''
        },
    },
    reducers: {
        loadAccountsRequest(state) {
            state.accounts.isLoading = true;
            state.accounts.loadingError = '';
        },

        loadAccountsSuccess(state, action) {
            state.accounts.isLoading = false;
            state.accounts.loadingError = '';
            state.accounts.accountData = action.payload.data
        },

        loadAccountsFailure(state, action) {
            state.isLoading = false;
            state.authError = action.payload.authError;
        }
    }
});

export const adminActions = adminSlice.actions;
export default adminSlice;