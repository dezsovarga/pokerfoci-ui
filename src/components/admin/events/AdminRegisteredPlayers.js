import React from "react";
import classes from "./AdminRegisteredPlayers.module.css";
import {Table} from "react-bootstrap";

const AdminRegisteredPlayers = (props) => {

    const playerCard = (player) => {
        return (
            <span>
                {player.username}
            </span>
        )
    }
    const registeredPlayerList = props.registeredPlayers.map((player, index) =>
        <tr key={index+1}>
            <td>{index+1}</td>
            <td>{playerCard(player)}</td>
        </tr>
    );

    return (
        <React.Fragment >

            <div className={classes.listWidth}>
                <Table  striped bordered >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Registered Players</th>
                    </tr>
                    </thead>
                    <tbody>
                    {registeredPlayerList}
                    </tbody>
                </Table>
            </div>

        </React.Fragment>
    );
}

export default AdminRegisteredPlayers;