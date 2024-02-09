import { createSlice } from '@reduxjs/toolkit';

const unRegisterFromLatestEventSlice = createSlice({
    name: 'unRegisterFromLatestEvent',
    initialState: {
        isLoading: false,
        successMessage: '',
        loadingError: '',
        latestEventData: {},
        registeredPlayers: []
    },
    reducers: {
        loadUnRegisterFromLatestEventRequest(state) {
            state.isLoading = true;
            state.successMessage = '';
            state.loadingError = '';
        },

        // loadUnRegisterFromLatestEventSuccess(state, action) -> same as loadLatestEventSuccess

        loadUnRegisterFromLatestEventFailure(state, action) {
            state.isLoading = false;
            state.loadingError = action.payload.loadingError;
        }
    }
});

export const unRegisterFromLatestEventActions = unRegisterFromLatestEventSlice.actions;
export default unRegisterFromLatestEventSlice;
