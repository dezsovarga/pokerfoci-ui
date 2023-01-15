import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        accounts: {
            accountData: [],
            isLoading: false,
            loadingError: '',
            showAddNewPlayerModal: false
        },
        saveAccount: {
            isLoading: false,
            loadingError: ''
        }
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
            state.accounts.isLoading = false;
            state.accounts.loadingError = action.payload.loadingError;
        },

        closeAddNewPlayerModal(state, action) {
            state.accounts.showAddNewPlayerModal = false
        },

        openAddNewPlayerModal(state, action) {
            state.accounts.showAddNewPlayerModal = true
        },

        saveAccountRequest(state, action) {
            state.saveAccount.isLoading = true
            state.saveAccount.loadingError = ''
        },

        saveAccountSuccess(state, action) {
            state.saveAccount.isLoading = false
            state.saveAccount.loadingError = ''
        },

        saveAccountFailure(state, action) {
            state.saveAccount.isLoading = false
            state.saveAccount.loadingError = action.error
        }
    }
});

export const adminActions = adminSlice.actions;
export default adminSlice;