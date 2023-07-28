import {renderWithProviders} from "../../../utils/test-utils";
import AdminBody from "../AdminBody";
import {screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
            showAddNewEventModal: true
        },
        saveEvent: {
            isLoading: false,
            savingError: ''
        },
    }
}

describe ('NewEventModal component', () => {

    test('Submitting NewEventModal with no event date selected', async () => {

        let {store} = renderWithProviders(<AdminBody section='events'/>, { preloadedState: initialState});

        // Assert
        const createNewEventModalTitle = await screen.findByText('Create new event');
        expect(createNewEventModalTitle).toBeInTheDocument();

        const submitButton = await screen.findByTestId("new-event-submit-button");
        userEvent.click(submitButton);

        // Assert
        const eventDatedValidationError = await screen.findByText('You need to provide a valid event date');
        expect(eventDatedValidationError).toBeInTheDocument();
        expect(store.getState().admin.saveEvent.savingError).toBe("You need to provide a valid event date")

    })

    test('Closing NewEventModal ', async () => {

        let {store} = renderWithProviders(<AdminBody section='events'/>, { preloadedState: initialState});

        // Assert
        const closeButton = await screen.findByTestId("add-new-event-modal-close");
        userEvent.click(closeButton);

        await waitForElementToBeRemoved(() => screen.queryByTestId('add-new-event-modal'))

        const createNewEventModal = screen.queryByTestId('add-new-event-modal');
        expect(createNewEventModal).toBeNull();
        expect(store.getState().admin.events.showAddNewEventModal).toBeFalsy();


    })

    //TODO: add test for adding event with correct data
})