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
        events: {
            eventsData: [],
            isLoading: false,
            loadingError: '',
            showAddNewEventModal: false,
            showEventPlayersManagerModal: false
        },
        saveAccount: {
            isLoading: false,
            savingError: ''
        },
        saveEvent: {
            isLoading: false,
            savingError: ''
        },
        updateEvent: {
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

        //used for event creation
        updateAccountSelection(state, action) {
            state.accounts.accountData = state.accounts.accountData.map((obj, index) => {
                if (action.payload.selectedIndex === index) {
                    return {...obj, selected: !obj.selected};
                }
            return obj;
            });
        },

        closeAddNewPlayerModal(state, action) {
            state.accounts.showAddNewPlayerModal = false
            state.saveAccount.savingError = ''
        },

        openAddNewPlayerModal(state, action) {
            state.accounts.showAddNewPlayerModal = true
        },
        closeAddNewEventModal(state, action) {
            state.events.showAddNewEventModal = false
            state.saveEvent.savingError = ''
        },

        openAddNewEventModal(state, action) {
            state.events.showAddNewEventModal = true
        },

        openEventPlayersManagerModal(state, action) {
            state.events.showEventPlayersManagerModal = true
        },
        closeEventPlayersManagerModal(state, action) {
            state.events.showEventPlayersManagerModal = false
            state.saveEvent.savingError = ''
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

        saveEventRequest(state, action) {
            state.saveEvent.isLoading = true
            state.saveEvent.savingError = ''
        },

        saveEventSuccess(state, action) {
            state.saveEvent.isLoading = false
            state.saveEvent.savingError = ''
        },

        saveEventFailure(state, action) {
            state.saveEvent.isLoading = false
            state.saveEvent.savingError = action.payload.error
            state.saveEvent.showAddNewEventModal = true
        },

        updateEventRequest(state, action) {
            state.saveEvent.isLoading = true
            state.saveEvent.savingError = ''
        },

        updateEventSuccess(state, action) {
            state.saveEvent.isLoading = false
            state.saveEvent.savingError = ''
        },

        updateEventFailure(state, action) {
            state.saveEvent.isLoading = false
            state.saveEvent.savingError = action.payload.error
            state.saveEvent.showAddNewEventModal = true
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

        loadEventsRequest(state) {
            state.events.isLoading = true;
            state.events.loadingError = '';
        },

        loadEventsSuccess(state, action) {
            state.events.isLoading = false;
            state.events.loadingError = '';
            state.events.eventsData = action.payload.data
        },

        loadEventsFailure(state, action) {
            state.events.isLoading = false;
            state.events.loadingError = action.payload.loadingError;
        },
    }
});

export const adminActions = adminSlice.actions;
export default adminSlice;