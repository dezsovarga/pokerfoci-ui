import {renderWithProviders} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import UserProfile from "./UserProfile";

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
    }
}


describe('UserProfile component', () => {

    test('renders UserProfile component', () => {
        // Arrange
        let {store} = renderWithProviders(<UserProfile/>, { preloadedState: initialState});
        // Act
        // ... nothing

        // Assert
        const avatarIcon = screen.getByTestId('avatar-icon');
        expect(avatarIcon).toBeInTheDocument();
        const username = screen.getByText('loggedInUser');
        expect(username).toBeInTheDocument();

    });

});
