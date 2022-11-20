import {renderWithProviders} from "../../../utils/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupContainer from "./SignupContainer";

const mockFetch = (status: boolean, signupResponse: Object) => {
    window.fetch = jest.fn(() =>
        Promise.resolve({
            ok: status,
            json: async () => Promise.resolve(signupResponse),
        })
    );
};

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

        mockFetch(true,{confirmToken: 'eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SndaWEp0SWpvaWUxd2lZV05qYjNWdWRFUjBiMXdpT250Y0luVnpaWEp1WVcxbFhDSTZYQ0oyYVc1cGRHOXlYQ0lzWENKbGJXRnBiRndpT2x3aWRtbHVhWFJ2Y2tCMllYSm5ZUzVqYjIxY0lpeGNJbkJoYzNOM2IzSmtYQ0k2WENKMmFXNXBkRzl5WENJc1hDSmpiMjVtYVhKdFVHRnpjM2R2Y21SY0lqcGNJblpwYm1sMGIzSmNJbjBzWENKMlpYSnBabWxqWVhScGIyNU1hVzVyWENJNmJuVnNiQ3hjSW1OdmJtWnBjbTFVYjJ0bGJsd2lPbTUxYkd4OUlpd2laWGh3SWpveE5qWTRPRGN5TURBNExDSnpkV0lpT2lKMmFXNXBkRzl5UUhaaGNtZGhMbU52YlNJc0luSnZiR1Z6SWpvaWRYTmxjaUlzSW1saGRDSTZNVFkyT0RjNE5UWXdPSDAuREV5b2JMX0U3YlZhNElVZERUOHktYmhla0pYbHZMTWJTOUFxSVFMcXNGbyIsInVzZXJuYW1lIjoidmluaXRvckB2YXJnYS5jb20ifQ',
            verificationLink: 'http://localhost:3000/activate-account/eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SndaWEp0SWpvaWUxd2lZV05qYjNWdWRFUjBiMXdpT250Y0luVnpaWEp1WVcxbFhDSTZYQ0oyYVc1cGRHOXlYQ0lzWENKbGJXRnBiRndpT2x3aWRtbHVhWFJ2Y2tCMllYSm5ZUzVqYjIxY0lpeGNJbkJoYzNOM2IzSmtYQ0k2WENKMmFXNXBkRzl5WENJc1hDSmpiMjVtYVhKdFVHRnpjM2R2Y21SY0lqcGNJblpwYm1sMGIzSmNJbjBzWENKMlpYSnBabWxqWVhScGIyNU1hVzVyWENJNmJuVnNiQ3hjSW1OdmJtWnBjbTFVYjJ0bGJsd2lPbTUxYkd4OUlpd2laWGh3SWpveE5qWTRPRGN5TURBNExDSnpkV0lpT2lKMmFXNXBkRzl5UUhaaGNtZGhMbU52YlNJc0luSnZiR1Z6SWpvaWRYTmxjaUlzSW1saGRDSTZNVFkyT0RjNE5UWXdPSDAuREV5b2JMX0U3YlZhNElVZERUOHktYmhla0pYbHZMTWJTOUFxSVFMcXNGbyIsInVzZXJuYW1lIjoidmluaXRvckB2YXJnYS5jb20ifQ'})

        // Arrange
        renderWithProviders(<Router><SignupContainer /></Router>);

        // Act - submit signup form
        const signupButton = screen.getByTestId('signup-button');
        userEvent.click(signupButton);

        //Assert
        const confirmIcon = await screen.findByTestId('confirm-icon');
        expect(confirmIcon).toBeInTheDocument();
    });

    test('submitting signup form responses with 409 Account already exisit', async () => {

        mockFetch(false, {code: '409',
            reason: 'Account already exists!'});
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
