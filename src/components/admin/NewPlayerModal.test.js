import {renderWithProviders} from "../../utils/test-utils";
import PlayersTable from "./PlayersTable";
import {screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const initialState = {
    login: {
        token: 'sssssatokenaaaaa',
        username: 'loggedInUser',
        isLoggedIn: false,
        isLoading: false,
        authError: ''
    },
    signup: {
        confirmToken: '',
        signupSuccessful: false,
        isLoading: false,
        validationError: ''
    },
    accountActivation : {
        accountActivated: false,
        alreadyConfirmed: false,
        isLoading: false,
        activationError: ''
    },
    profile: {
        isLoading: false,
        successMessage: '',
        errorMessage: ''
    },
    admin: {
        accounts: {
            accountData: [],
            isLoading: false,
            loadingError: '',
            showAddNewPlayerModal: true
        },
        saveAccount: {
            isLoading: false,
            savingError: ''
        }
    }
}

describe ('NewPlayerModal component', () => {

    test('Submitting NewPlayerModal with different password and confirmPassword', async () => {

        // Arrange
        let {store} = renderWithProviders(<PlayersTable/>, { preloadedState: initialState});

        // Assert
        const addNewPlayerModalTitle = await screen.findByText('Add new player');
        expect(addNewPlayerModalTitle).toBeInTheDocument();

        const passwordInput = screen.getByTestId('password-input');
        fireEvent.change(passwordInput, {target: {value: 'password'}})

        const confirmPasswordInput = screen.getByTestId('confirm-password-input');
        fireEvent.change(confirmPasswordInput, {target: {value: 'someOtherPassword'}})

        const addNewPlayerSubmit = await screen.findByTestId('new-player-submit-button');
        userEvent.click(addNewPlayerSubmit);

        const passwordValidationError = await screen.findByText('Password and confirmPassword should match');
        expect(passwordValidationError).toBeInTheDocument();

    })

    test('Submitting NewPlayerModal with correct data', async () => {

        // Arrange
        let {store} = renderWithProviders(<PlayersTable/>, { preloadedState: initialState});

        // Assert
        const addNewPlayerModalTitle = await screen.findByText('Add new player');
        expect(addNewPlayerModalTitle).toBeInTheDocument();

        //TODO: implement test

    })
})