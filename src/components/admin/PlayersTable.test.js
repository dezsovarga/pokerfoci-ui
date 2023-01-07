import {renderWithProviders} from "../../utils/test-utils";
import PlayersTable from "./PlayersTable";
import {screen} from "@testing-library/react";
import server from "../../mocks/server";
import {rest} from "msw";

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
            loadingError: ''
        }
    }
}

describe ('PlayersTable component', () => {

    test('Renders players table', async () => {

        // Arrange
        let {store} = renderWithProviders(<PlayersTable/>, { preloadedState: initialState});

        // Assert
        const adminPlayersTable = await screen.findByTestId('admin-players-table');
        expect(adminPlayersTable).toBeInTheDocument();
        const dezsovarga = screen.getByText('dezsovarga');
        expect(dezsovarga).toBeInTheDocument();
        const szury = screen.getByText('szury');
        expect(szury).toBeInTheDocument();
    })

    test('Renders players table with error', async () => {

        server.use(
            rest.get('http://localhost:8081/admin/accounts', (req, res, ctx) => {
                return res(ctx.status(500), ctx.json(
                    {status: '500', error: 'Internal Server Error'}));
            })
        );
        // Arrange
        let {store} = renderWithProviders(<PlayersTable/>, { preloadedState: initialState});

        // Assert

        const serverError = await screen.findByText('Internal Server Error');
        expect(serverError).toBeInTheDocument();
    })
})