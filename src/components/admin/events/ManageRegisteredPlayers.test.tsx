import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManageRegisteredPlayers from "./ManageRegisteredPlayers";

const registeredPlayers = [
    {username: "szury", userEmail: "email", skill: 60},
    {username: "dezsovarga", userEmail: "email", skill: 60},
    {username: "kuki", userEmail: "email", skill: 60},
];
const initialState = {
    login: {
        token: 'sssssatokenaaaaa',
        username: 'loggedInUser',
        isLoggedIn: false,
        isLoading: false,
        authError: ''
    },
    latestEvent: {
      registeredPlayers: [
          {
              username: 'szury',
              userEmail: 'szury@szury.com',
              skill: 60,
              registrationDate: '2024-08-16T14:01:30'
          },
          {
              username: 'dezsovarga',
              userEmail: 'dezso@dezso.com',
              skill: 60,
              registrationDate: '2024-08-16T14:01:30'
          },
          {
              username: 'kuki',
              userEmail: 'kuki@kuki.com',
              skill: 60,
              registrationDate: '2024-08-16T14:01:30'
          }
      ]
    },
    admin: {
        accounts: {
            accountData: [],
            isLoading: false,
            loadingError: ''
        },
        events: {
            eventsData: [],
            isLoading: false,
            loadingError: '',
            showAddNewEventModal: true
        },
        saveEvent: {
            isLoading: false,
            savingError: ''
        },
    }
}

describe ('ManageRegisteredPlayers component', () => {

    test('Rendering ManageRegisteredPlayers component with a list of players', async () => {

        let {store} = renderWithProviders(<ManageRegisteredPlayers />, { preloadedState: initialState});

        // Assert
        const registeredPlayersTableTitle = await screen.findByTestId("registered-players");
        expect(registeredPlayersTableTitle).toBeInTheDocument();

        const playerName = await screen.findByText('dezsovarga');
        expect(playerName).toBeInTheDocument();

        const szury = await screen.findByText('szury');
        expect(szury).toBeInTheDocument();


        const managePlayersButton = await screen.findByTestId("manage-players-button");
        expect(managePlayersButton).toBeInTheDocument();
    })

    test('Rendering ManageRegisteredPlayers and opening player manager modal', async () => {

        let {store} = renderWithProviders(<ManageRegisteredPlayers />, { preloadedState: initialState});

        const managePlayersButton = await screen.findByTestId("manage-players-button");
        userEvent.click(managePlayersButton);

        const updateEventModal = await screen.findByTestId("update-event-modal");
        expect(updateEventModal).toBeInTheDocument();

        const dezsovarga = await screen.findByText('dezsovarga');
        expect(dezsovarga).toBeInTheDocument();

        const szury = await screen.findByText('szury');
        expect(szury).toBeInTheDocument();
    })
})