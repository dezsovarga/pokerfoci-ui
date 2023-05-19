import {renderWithProviders} from "../../../utils/test-utils";
import {screen, fireEvent, waitForElementToBeRemoved} from "@testing-library/react";
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
        },
        updateAccount: {
            isLoading: false,
            updateError: ''
        }
    }
}

describe ('NewPlayerModal component', () => {

    test('Submitting NewPlayerModal with different password and confirmPassword', async () => {

        // Arrange
        let {store} = renderWithProviders(<AdminBody section='players'/>, { preloadedState: initialState});

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
        expect(store.getState().admin.saveAccount.savingError).toBe("Password and confirmPassword should match")

    })

    test('Submitting NewPlayerModal with correct data', async () => {

        // Arrange
        let {store} = renderWithProviders(<AdminBody section='players'/>, { preloadedState: initialState});

        // Assert
        const addNewPlayerModalTitle = await screen.findByText('Add new player');
        expect(addNewPlayerModalTitle).toBeInTheDocument();

        const usernameInput = screen.getByTestId('username-input');
        fireEvent.change(usernameInput, {target: {value: 'testUser'}})

        const skillInput = screen.getByTestId('skill-input');
        fireEvent.change(skillInput, {target: {value: '60'}})

        const emailInput = screen.getByTestId('email-input');
        fireEvent.change(emailInput, {target: {value: 'test@email.com'}})

        const passwordInput = screen.getByTestId('password-input');
        fireEvent.change(passwordInput, {target: {value: 'password'}})

        const confirmPasswordInput = screen.getByTestId('confirm-password-input');
        fireEvent.change(confirmPasswordInput, {target: {value: 'password'}})

        const addNewPlayerSubmit = await screen.findByTestId('new-player-submit-button');
        userEvent.click(addNewPlayerSubmit);

        await waitForElementToBeRemoved(() => screen.queryByTestId('add-new-player-modal'))

        const addNewPlayerModal = screen.queryByTestId('add-new-player-modal');
        expect(addNewPlayerModal).toBeNull();

        expect(store.getState().admin.saveAccount.savingError).toBe("");

    })
})