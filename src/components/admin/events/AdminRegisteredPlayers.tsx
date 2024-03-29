import React, {useState} from "react";
import classes from "./AdminRegisteredPlayers.module.css";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EventPlayersManagerModal from "./EventPlayersManagerModal";
import {useDispatch} from "react-redux";
import {adminActions} from "../../../store/admin-slice";
import {PlayerData} from "../../home/EventRegistrationWidget";

type AdminRegisteredPlayersProp = {
    registeredPlayers: PlayerData[],
    loadEvents: () => void
}

const AdminRegisteredPlayers: React.FC<AdminRegisteredPlayersProp> = (props) => {

    const dispatch = useDispatch();
    const [registeredPlayers, setRegisteredPlayers] = useState(props.registeredPlayers);

    const playerCard = (player) => {
        return (
            <span>
                {player.username}
            </span>
        )
    }

    const handleShowPlayerManager = (event) => {
        event.preventDefault();
        dispatch(adminActions.openEventPlayersManagerModal())
    }

    const registeredPlayerList = registeredPlayers.map((player, index) =>
        <tr key={index+1}>
            <td>{index+1}</td>
            <td>{playerCard(player)}</td>
        </tr>
    );

    const onUpdateRegisteredPlayersList = (updatedRegisteredPlayers) => {
        setRegisteredPlayers(updatedRegisteredPlayers);
    }

    const RegisteredPlayersTable = () => {
        return (
            <React.Fragment >
                <div className={classes.listWidth}>
                    <Table  striped bordered >
                        <thead>
                        <tr>
                            <th>#</th>
                            <th data-testid='registered-players'>Registered Players</th>
                        </tr>
                        </thead>
                        <tbody>
                        {registeredPlayerList}
                        </tbody>
                    </Table>
                    <Button onClick={handleShowPlayerManager}
                        type="submit" variant="primary"
                        data-testid='manage-players-button'>
                        Manage players
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <RegisteredPlayersTable />
            <EventPlayersManagerModal preselectedPlayers={props.registeredPlayers} updateRegisteredPlayersList={onUpdateRegisteredPlayersList}  />
        </React.Fragment>

    );
}

export default AdminRegisteredPlayers;