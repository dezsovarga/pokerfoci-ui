import {renderWithProviders} from "../../../utils/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmSignup from "./ConfirmSignup";
import PokerfociApp from "../../PokerfociApp";
import {loginActions} from "../../../store/login-slice";
import server from "../../../mocks/server";
import {rest} from "msw";

const navigateToLoginPage = () => {
    const loginLink = screen.getByTestId('login-link');
    userEvent.click(loginLink);
}

const navigateToSignupPage = () => {
    const signupLink = screen.getByTestId('signup-link');
    userEvent.click(signupLink);
}

export const submitSignup = () => {
    navigateToLoginPage();
    navigateToSignupPage();
    const signupButton = screen.getByTestId('signup-button');
    userEvent.click(signupButton);
}

export const clickOnActivateAccount = () => {
    const activateAccountButton = screen.getByTestId('activate-account-button');
    userEvent.click(activateAccountButton);
}

describe('ConfirmSignup component', () => {


    test('renders ConfirmSignup', () => {
        // Arrange
        renderWithProviders(<Router><ConfirmSignup /></Router>);

        // Act
        // ... nothing

        // Assert
        const confirmTitle = screen.getByText('Your signup request has been recieved');
        expect(confirmTitle).toBeInTheDocument();

        const confirmIcon = screen.getByTestId('confirm-icon');
        expect(confirmIcon).toBeInTheDocument();
    });

    test('clicking on activate account', async () => {

        const { store } = renderWithProviders(<PokerfociApp/>);
        store.dispatch(loginActions.logout());

        submitSignup();

        const confirmIcon = await screen.findByTestId('confirm-icon');
        expect(confirmIcon).toBeInTheDocument();

        clickOnActivateAccount();

        // Assert
        const activationTitle = await screen.findByTestId('confirmed-successfully');
        expect(activationTitle).toBeInTheDocument();

        const confirmActivationIcon = await screen.findByTestId('confirm-activation-icon');
        expect(confirmActivationIcon).toBeInTheDocument();

        const logoutButton = await screen.findByTestId('logout-button');
        userEvent.click(logoutButton);
    });

    test('clicking on activate account, but already verified', async () => {

        server.use(
            rest.get('http://localhost:8081/account/register/confirm/:confirmToken', (req, res, ctx) => {
                return res(ctx.status(409), ctx.json(
                    {code: '409', reason: 'User already verified'}));
            })
        );
        const { store } = renderWithProviders(<PokerfociApp/>);
        submitSignup();

        const confirmIcon = await screen.findByTestId('confirm-icon');
        expect(confirmIcon).toBeInTheDocument();

        clickOnActivateAccount();

        // Assert
        const alreadyConfirmed = await screen.findByText('Your account has already been confirmed!');
        expect(alreadyConfirmed).toBeInTheDocument();
    });

});
