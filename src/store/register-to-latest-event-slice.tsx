import { createSlice } from '@reduxjs/toolkit';

const registerToLatestEventSlice = createSlice({
    name: 'registerToLatestEvent',
    initialState: {
        isLoading: false,
        successMessage: '',
        loadingError: '',
        latestEventData: {},
        registeredPlayers: []
    },
    reducers: {
        loadRegisterToLatestEventRequest(state) {
            state.isLoading = true;
            state.successMessage = '';
            state.loadingError = '';
        },

        // loadRegisterToLatestEventSuccess(state, action) -> same as loadLatestEventSuccess

        loadRegisterToLatestEventFailure(state, action) {
            state.isLoading = false;
            state.loadingError = action.payload.loadingError;
        }
    }
});

export const registerToLatestEventActions = registerToLatestEventSlice.actions;
export default registerToLatestEventSlice;
