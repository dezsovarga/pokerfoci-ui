import classes from "./NewEventModal.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import {CheckCircle, Circle} from "react-bootstrap-icons";
import React from "react";
import {adminActions} from "../../../store/admin-slice";
import {useDispatch} from "react-redux";
import Form from "react-bootstrap/Form";

type PlayerSelectorProp = {
    accounts: AccountData[];
}

export type AccountData = {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    isAdmin: boolean;
    skill: number;
    selected: boolean;
}

const PlayerSelector: React.FC<PlayerSelectorProp> = (props) => {

    const dispatch = useDispatch();

    const updatePlayerSelection = (selectedIndex) => {
        dispatch(adminActions.updateAccountSelection({selectedIndex: selectedIndex}));
    };

    const allPayersList = () => {
        return (
            <div className={classes.playerList}>
                <ListGroup  as="ol" >
                    {props.accounts.map((player, index) =>
                        <ListGroup.Item key={player.id} onClick={() => updatePlayerSelection(index)}
                                        as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw">{player.username}</div>
                            </div>
                            {!player.selected && <Circle className={classes.playerCheck} data-testid='player-not-checked'/>}
                            {player.selected && <CheckCircle className={classes.playerCheck} data-testid='player-checked'/>}

                        </ListGroup.Item> )
                    }
                </ListGroup>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Form.Label>Select players</Form.Label>
            {allPayersList()}
        </React.Fragment>
    )
}

export default PlayerSelector;