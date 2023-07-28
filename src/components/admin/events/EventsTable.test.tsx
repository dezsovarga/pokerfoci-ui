import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminBody from "../AdminBody";

const initialState = {
    login: {
        token: 'sssssatokenaaaaa',
        username: 'loggedInUser',
        isLoggedIn: false,
        isLoading: false,
        authError: ''
    },
    admin: {
        accounts: {
            accountData: [],
            isLoading: false,
            loadingError: ''
        },
        events: {
            eventsData: [],
            isLoading: false,
            loadingError: '',
            showAddNewEventModal: false
        },
        saveEvent: {
            isLoading: false,
            savingError: ''
        },
    }
}

describe ('EventsTable component', () => {

    test('Renders events table', async () => {

        // Arrange
        let {store} = renderWithProviders(<AdminBody section='events'/>, {preloadedState: initialState});

        // Assert
        const adminEventsTable = await screen.findByTestId('admin-events-table');

        expect(adminEventsTable).toBeInTheDocument();

    })

    test('Clicking on the PLUS button, the  newEventModal is rendered', async () => {

        // Arrange
        let {store} = renderWithProviders(<AdminBody section='events'/>, { preloadedState: initialState});

        // Action
        const addNewEventButton = await screen.findByTestId('add-new-event');
        userEvent.click(addNewEventButton);

        // Assert

        const addNewEventModalTitle = await screen.findByText('Create new event');
        expect(addNewEventModalTitle).toBeInTheDocument();

        const addNewPlayerModalCloseButton = await screen.findByTestId('add-new-event-modal-close');
        expect(addNewPlayerModalCloseButton).toBeInTheDocument();
    })
})