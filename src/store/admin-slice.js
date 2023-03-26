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
            savingError: ''
        },
        updateAccount: {
            isLoading: false,
            updateError: ''
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
            state.saveAccount.savingError = ''
        },

        openAddNewPlayerModal(state, action) {
            state.accounts.showAddNewPlayerModal = true
        },

        saveAccountRequest(state, action) {
            state.saveAccount.isLoading = true
            state.saveAccount.savingError = ''
        },

        saveAccountSuccess(state, action) {
            state.saveAccount.isLoading = false
            state.saveAccount.savingError = ''
        },

        saveAccountFailure(state, action) {
            state.saveAccount.isLoading = false
            state.saveAccount.savingError = action.payload.error
            state.accounts.showAddNewPlayerModal = true
        },

        updateAccountRequest(state, action) {
            state.updateAccount.isLoading = true
            state.updateAccount.updateError = ''
        },

        updateAccountSuccess(state, action) {
            state.updateAccount.isLoading = false
            state.updateAccount.updateError = ''
            const foundIndex = state.accounts.accountData.findIndex(a => a.id === action.payload.data.id);
            state.accounts.accountData[foundIndex] = action.payload.data;
        },
        updateAccountFailure(state, action) {
            state.updateAccount.isLoading = false
            state.updateAccount.updateError = action.payload.error
        },
    }
});

export const adminActions = adminSlice.actions;
export default adminSlice;