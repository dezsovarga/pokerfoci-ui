import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import PlayerView from "./PlayerView";
import Button from "react-bootstrap/Button";
import classes from './Home.module.css';
import {useSelector} from "react-redux";

type PlayerData = {
    username: string;
    skill: number;
}
type EventData = {
    registeredPlayers: PlayerData[];
}

const EventRegistrationWidget: React.FC<EventData> = (props) => {

    const registeredPlayers = useSelector(state => state.latestEvent.registeredPlayers);
    // const eventData = useSelector(state => state.latestEvent.latestEventData);

    const registeredPlayersList = () => {
        return registeredPlayers.map((player, index) => {
            return (
                <Row>
                    <Col key={index}  >
                        <PlayerView name={player.username} imageUrl={''} willPlay={index <= 11} ></PlayerView>
                    </Col>
                </Row>)
        })
    }

    return (
        <Container data-testid='registered-players-widget'>
            {registeredPlayersList()}
            <Button className={classes.registerButton} variant="primary">Register Now</Button>
        </Container>
    )
}

export default EventRegistrationWidget;