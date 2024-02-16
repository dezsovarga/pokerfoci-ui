import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import PlayerView from "./PlayerView";
import Button from "react-bootstrap/Button";
import classes from './Home.module.css';
import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../../Constants";
import {latestEventActions} from "../../store/latest-event-slice";
import {registerToLatestEventActions} from "../../store/register-to-latest-event-slice";
import {unRegisterFromLatestEventActions} from "../../store/unregister-from-latest-event-slice";

type PlayerData = {
    username: string;
    userEmail: string;
    skill: number;
}
type EventData = {
    registeredPlayers: PlayerData[];
}

const EventRegistrationWidget: React.FC<EventData> = (props) => {

    const dispatch = useDispatch();
    const registeredPlayers = useSelector(state => state.latestEvent.registeredPlayers);
    const {token, username} = useSelector(state => state.login);
    const alreadyRegistered = registeredPlayers.some((player: PlayerData) => player.userEmail === username)

    // const eventData = useSelector(state => state.latestEvent.latestEventData);

    const registeredPlayersList = () => {
        return registeredPlayers.map((player, index) => {
            return (
                <Row>
                    <Col key={index}  >
                        <PlayerView name={player.username} imageUrl={''} willPlay={index <= 2} ></PlayerView>
                    </Col>
                </Row>)
        })
    }

    const unRegisterFromEvent = (event) => {
        event.preventDefault();
        dispatch(unRegisterFromLatestEventActions.loadUnRegisterFromLatestEventRequest());

        fetch(`${API_URL}/event/unregister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                res.json().then((data) => {
                    dispatch(latestEventActions.loadLatestEventSuccess({data: data}));
                });
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for event unregistration failed';
                    dispatch(unRegisterFromLatestEventActions.loadUnRegisterFromLatestEventFailure({
                        loadingError: errorMessage
                    }));
                });
            }
        });
    }

    const registerToEvent = (event) => {
        event.preventDefault();
        dispatch(registerToLatestEventActions.loadRegisterToLatestEventRequest());

        fetch(`${API_URL}/event/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                res.json().then((data) => {
                    dispatch(latestEventActions.loadLatestEventSuccess({data: data}));
                });
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for event registration failed';
                    dispatch(registerToLatestEventActions.loadRegisterToLatestEventFailure({
                        loadingError: errorMessage
                    }));
                });
            }
        });
    }

    const submitHandler = (event) => {
        !alreadyRegistered ? registerToEvent(event) : unRegisterFromEvent(event);
    }

    return (
        <Container data-testid='registered-players-widget'>
            {registeredPlayersList()}
            <form onSubmit={submitHandler}>
                { alreadyRegistered &&
                    <Button className={classes.registerButton}
                            type="submit" variant="primary"
                            data-testid='unregister-button'>
                        Unregister from event
                    </Button> }
                { !alreadyRegistered &&
                    <Button className={classes.registerButton}
                            type="submit" variant="primary"
                            data-testid='register-button'>
                        Register Now
                    </Button> }
            </form>

        </Container>
    )
}

export default EventRegistrationWidget;