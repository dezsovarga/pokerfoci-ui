import {renderWithProviders} from "../../utils/test-utils";
import EventRegistrationWidget from "./EventRegistrationWidget";
import {screen} from "@testing-library/react";

const initialState = {
    login: {
        token: 'sssssatokenaaaaa',
        username: 'szury@varga.com',
        isLoggedIn: false,
        isLoading: false,
        authError: ''
    },
    latestEvent: {
        registeredPlayers: [
            {
                username: 'username',
                userEmail: 'userEmail',
                skill: 70,
                registrationDate: ''
            }
        ]
    }
}

describe ('EventRegistrationWidget component', () => {

    test('Renders registration button', async () => {

        // Arrange
        let {store} = renderWithProviders(<EventRegistrationWidget />, { preloadedState: initialState});

        // Assert
        const registerButton = await screen.findByTestId('register-button');
        expect(registerButton).toBeInTheDocument();
    })

    test('Renders unregistration button', async () => {

        initialState.login.username = 'userEmail';

        // Arrange
        let {store} = renderWithProviders(<EventRegistrationWidget />, { preloadedState: initialState});

        // Assert
        const registerButton = await screen.findByTestId('unregister-button');
        expect(registerButton).toBeInTheDocument();
    })

})