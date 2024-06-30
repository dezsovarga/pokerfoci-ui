import { createSlice } from '@reduxjs/toolkit';

const latestEventSlice = createSlice({
    name: 'latestEvent',
    initialState: {
        generatingTeamsInProgress: false,
        isLoading: false,
        successMessage: '',
        loadingError: '',
        latestEventData: {},
        registeredPlayers: [],
        teamVariations: [],
        eventLogs: []

    },
    reducers: {
        loadLatestEventRequest(state) {
            state.isLoading = true;
            state.successMessage = '';
            state.loadingError = '';
        },

        loadLatestEventSuccess(state, action) {
            state.isLoading = false;
            state.successMessage = action.payload.successMessage;
            state.loadingError = '';
            state.latestEventData = action.payload.data;
            state.registeredPlayers = action.payload.data.registeredPlayers;
            state.eventLogs = action.payload.data.eventLogs;
        },

        loadLatestEventFailure(state, action) {
            state.isLoading = false;
            state.loadingError = action.payload.loadingError;
        },

        generateTeamsRequest(state) {
            state.generatingTeamsInProgress = true;
            state.successMessage = '';
            state.loadingError = '';
        },

        generateTeamsSuccess(state, action) {
            state.generatingTeamsInProgress = false;
            state.successMessage = action.payload.successMessage;
            state.loadingError = '';
            state.teamVariations = action.payload.data.teamVariations;
            state.latestEventData = action.payload.data;
            state.registeredPlayers = action.payload.data.registeredPlayers;
            state.eventLogs = action.payload.data.eventLogs;
        },

        generateTeamsFailure(state, action) {
            state.generatingTeamsInProgress = false;
            state.loadingError = action.payload.loadingError;
        }
    }
});

export const latestEventActions = latestEventSlice.actions;
export default latestEventSlice;
