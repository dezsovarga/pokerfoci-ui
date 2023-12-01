import {renderWithProviders} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import Home from "./Home";

const initialState = {
}

describe ('Home component', () => {

    test('Renders registered players widget', async () => {

        // Arrange
        let {store} = renderWithProviders(<Home />, { preloadedState: initialState});

        // Assert
        const adminPlayersTable = await screen.findByTestId('registered-players-widget');
        expect(adminPlayersTable).toBeInTheDocument();
        const dezsovarga = await screen.findByText('horvathkuki');
        expect(dezsovarga).toBeInTheDocument();
        const szury = await screen.findByText('szury');
        expect(szury).toBeInTheDocument();
    })

    //TODO: test negative cases

})