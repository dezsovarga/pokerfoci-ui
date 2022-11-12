import { render, screen } from '@testing-library/react';
import LoginContainer from "./LoginContainer";
import {BrowserRouter, BrowserRouter as Router} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import PokerfociApp from "../../PokerfociApp";

describe('LoginContainer component', () => {

    const navigateToLoginPage = () => {
        const loginLink = screen.getByTestId('login-link');
        userEvent.click(loginLink);
    }

    test('renders LoginContainer', () => {
        // Arrange
        render(
            <Router>
                <LoginContainer />
            </Router>);

        // Act
        // ... nothing

        // Assert
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toBeInTheDocument();
    });

    test('clicking on "Create an Account" link navigates to SignupContainer', () => {
        // Arrange
        render(<PokerfociApp/>);
        navigateToLoginPage();

        // Act - navigate to signup page
        const signupLink = screen.getByTestId('signup-link');
        userEvent.click(signupLink);

        //Assert
        const signupForm = screen.getByTestId('signup-form');
        expect(signupForm).toBeInTheDocument();
    });

});