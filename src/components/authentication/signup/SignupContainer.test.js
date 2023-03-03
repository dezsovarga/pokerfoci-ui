import {renderWithProviders} from "../../../utils/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupContainer from "./SignupContainer";
import { rest } from "msw";
import server from "../../../mocks/server";
import {REACT_APP_API_URL} from "../../../Constants";

describe('SignupContainer component', () => {


    test('renders SignupContainer', () => {
        // Arrange
        renderWithProviders(<Router><SignupContainer /></Router>);

        // Act
        // ... nothing

        // Assert
        const loginForm = screen.getByTestId('signup-form');
        expect(loginForm).toBeInTheDocument();
    });

    test('clicking on "Login here" link navigates to LoginContainer', () => {
        // Arrange
        renderWithProviders(<Router><SignupContainer /></Router>);

        // Act - navigate to signup page
        const signupLink = screen.getByTestId('login-here-link');
        userEvent.click(signupLink);

        //Assert
        const signupForm = screen.getByTestId('signup-form');
        expect(signupForm).toBeInTheDocument();
    });

    test('submitting signup form', async () => {
        // Arrange
        renderWithProviders(<Router><SignupContainer /></Router>);

        // Act - submit signup form
        const signupButton = screen.getByTestId('signup-button');
        userEvent.click(signupButton);

        //Assert
        const confirmIcon = await screen.findByTestId('confirm-icon');
        expect(confirmIcon).toBeInTheDocument();
    });

    test('submitting signup form responses with 409 Account already exists', async () => {

        server.use(
            rest.post(`${REACT_APP_API_URL}/account/register`, (req, res, ctx) => {
                return res(ctx.status(409), ctx.json({
                    code: '409',
                    reason: 'Account already exists!'
                }));
            })
        );
        // Arrange
        renderWithProviders(<Router><SignupContainer /></Router>);

        // Act - submit signup form
        const signupButton = screen.getByTestId('signup-button');
        userEvent.click(signupButton);

        //Assert
        const validationError = await screen.findByText('Account already exists!');
        expect(validationError).toBeInTheDocument();
    });
});
