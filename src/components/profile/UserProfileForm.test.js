import {renderWithProviders} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProfileForm from "./UserProfileForm";
import server from "../../mocks/server";
import {rest} from "msw";
import {REACT_APP_API_URL} from "../../Constants";

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

    test('change password successfully', async() => {
        // Arrange
        let {store} = renderWithProviders(<UserProfileForm/>, { preloadedState: initialState});

        // Act
        const changePasswordButton = await screen.findByTestId('change-password-button');
        userEvent.click(changePasswordButton);

        // Assert
        const successMessage = await screen.findByText('Password changed successfully!');
        expect(successMessage).toBeInTheDocument();

    });

    test('change password failed', async() => {

        server.use(
            rest.post(`${REACT_APP_API_URL}/account/change-password`, (req, res, ctx) => {
                return res(ctx.status(412), ctx.json(
                    {code: '409', reason: 'Invalid request. Authorization failed for changing password'}));
            })
        );

        // Arrange
        let {store} = renderWithProviders(<UserProfileForm/>, { preloadedState: initialState});

        // Act
        const changePasswordButton = await screen.findByTestId('change-password-button');
        userEvent.click(changePasswordButton);

        // Assert
        const errorMessage = await screen.findByText('Invalid request. Authorization failed for changing password');
        expect(errorMessage).toBeInTheDocument();

    });

});