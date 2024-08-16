import React, {useState} from "react";
import classes from "./ManageRegisteredPlayers.module.css";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EventPlayersManagerModal from "./EventPlayersManagerModal";
import {useDispatch} from "react-redux";
import {adminActions} from "../../../store/admin-slice";
import {PlayerData} from "../../home/EventRegistrationWidget";
import manageIcon from "../../../assets/manage_teams.png";
import styled from "styled-components";

type ManageRegisteredPlayersProp = {
    registeredPlayers: PlayerData[],
}

const ManageTeamIcon = styled.img`
    width: 120px;
    margin: 15px
`

const ManageTeamWrapper = styled.div`
    padding: 15px;
`

const ManageRegisteredPlayers: React.FC<ManageRegisteredPlayersProp> = (props) => {

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
                    <ManageTeamWrapper>
                        <div>
                            <ManageTeamIcon className={classes.avatarIcon} alt="generate-icon" src={manageIcon}
                                            data-testid='generate-icon'/>
                        </div>

                        <Button onClick={handleShowPlayerManager}
                                type="submit" variant="primary"
                                data-testid='manage-players-button'>
                            Manage players
                        </Button>
                    </ManageTeamWrapper>

                    <Table striped bordered>
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

                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <RegisteredPlayersTable/>
            <EventPlayersManagerModal preselectedPlayers={props.registeredPlayers}
                                      updateRegisteredPlayersList={onUpdateRegisteredPlayersList}/>
        </React.Fragment>

    );
}

export default ManageRegisteredPlayers;