import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import ActivateAccount from "./ActivateAccount";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ConfirmSignup from "./ConfirmSignup";
import server from "../../../mocks/server";
import {rest} from "msw";
import {REACT_APP_API_URL} from "../../../Constants";

const initialState = {
    login: {
        token: 'sssssaaaaaa',
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

describe('ActivateAccount component', () => {

    test('renders ActivateAccount', async() => {
        server.use(
            rest.get(`${REACT_APP_API_URL}/account/register/confirm/:confirmToken`, (req, res, ctx) => {
                return res(ctx.status(409), ctx.json(
                    {code: '409', reason: 'User already verified'}));
            })
        );

        // Arrange
        const {store} = renderWithProviders(
            <Router>
                <Routes>
                    <Route path="/activate-account/:confirmToken" element={<ActivateAccount/>}/>
                </Routes>
                <ConfirmSignup confirmToken='asdasdasd'/>
            </Router>,
            { preloadedState: initialState} );

        const activateAccountButton = await screen.findByTestId('activate-account-button');
        userEvent.click(activateAccountButton);

        const alreadyConfirmed = await screen.findByText('Your account has already been confirmed!');
        expect(alreadyConfirmed).toBeInTheDocument();
    });

    test('renders ActivateAccount confirmed successfully', async() => {
        // Arrange
        const {store} = renderWithProviders(
            <Router>
                <Routes>
                    <Route path="/activate-account/:confirmToken" element={<ActivateAccount/>}/>
                </Routes>
                <ConfirmSignup confirmToken='asdasdasd'/>
            </Router>,
            { preloadedState: initialState} );

        const activateAccountButton = await screen.findByTestId('activate-account-button');
        userEvent.click(activateAccountButton);

        const activationTitle = await screen.findByTestId('confirmed-successfully');
        expect(activationTitle).toBeInTheDocument();
    });
});