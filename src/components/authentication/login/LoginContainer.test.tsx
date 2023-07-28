import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokerfociApp from "../../PokerfociApp";
import {renderWithProviders} from "../../../utils/test-utils";

const navigateToLoginPage = () => {
    const loginLink = screen.getByTestId('login-link');
    userEvent.click(loginLink);
}

describe('LoginContainer component', () => {

    test('renders LoginContainer', () => {
        // Arrange
        let {store} = renderWithProviders(<PokerfociApp/>);
        navigateToLoginPage();
        // Act
        // ... nothing

        // Assert
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toBeInTheDocument();
    });

    test('clicking on "Create an Account" link navigates to SignupContainer', () => {
        // Arrange
        let {store} = renderWithProviders(<PokerfociApp/>);
        navigateToLoginPage();

        // Act - navigate to signup page
        const signupLink = screen.getByTestId('signup-link');
        userEvent.click(signupLink);

        //Assert
        const signupForm = screen.getByTestId('signup-form');
        expect(signupForm).toBeInTheDocument();

    });

    test('submitting login form', async () => {

        // Arrange
        const {store} = renderWithProviders(<PokerfociApp/> );
        navigateToLoginPage();

        // Act - submit login form
        const loginButton = screen.getByTestId('login-button');
        userEvent.click(loginButton);

        //Assert
        const logoutButton = await screen.findByTestId('logout-button');
        expect(logoutButton).toBeInTheDocument();
        expect(store.getState().login.roles).toEqual(['ROLE_USER']);
    });

});
