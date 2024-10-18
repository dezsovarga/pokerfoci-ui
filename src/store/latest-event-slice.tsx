import { createSlice } from '@reduxjs/toolkit';

const latestEventSlice = createSlice({
    name: 'latestEvent',
    initialState: {
        generatingTeamsInProgress: false,
        updatingVariationsSelectionInProgress: false,
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
            state.teamVariations = action.payload.data.teamVariations;
            state.eventLogs = action.payload.data.eventLogs;
        },

        loadLatestEventFailure(state, action) {
            state.isLoading = false;
            state.loadingError = action.payload.loadingError;
        },

        updateVariationSelectionsRequest(state) {
            state.updatingVariationsSelectionInProgress = true;
        },

        updateVariationSelectionsSuccess(state, action) {
            state.updatingVariationsSelectionInProgress = false;
            state.teamVariations = action.payload.data.teamVariations;
            state.latestEventData = action.payload.data;
            state.registeredPlayers = action.payload.data.registeredPlayers;
            state.eventLogs = action.payload.data.eventLogs;
            state.successMessage = action.payload.successMessage;
        },

        updateVariationSelectionsFailure(state, action) {
            state.updatingVariationsSelectionInProgress = false;
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

        //used for team variation selection
        updateVariationSelection(state, action) {
            state.teamVariations = state.teamVariations.map((obj, index) => {
                if (action.payload.selectedIndex === index) {
                    return {...obj, selectedForVoting: !obj.selectedForVoting};
                }
                return obj;
            });
        },

        generateTeamsFailure(state, action) {
            state.generatingTeamsInProgress = false;
            state.loadingError = action.payload.loadingError;
        }
    }
});

export const latestEventActions = latestEventSlice.actions;
export default latestEventSlice;
