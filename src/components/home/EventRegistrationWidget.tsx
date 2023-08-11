import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import PlayerView from "./PlayerView";
import Button from "react-bootstrap/Button";
import classes from './Home.module.css';

const EventRegistrationWidget: React.FC = (props) => {

    const playerData: Array<string> = ['dezsovarga', 'vinitor', 'csabesz',
        'horvathbotond', 'horvathkuki', 'szury', 'orban', 'kuplung', 'miklos', 'alin', 'szlo', 'atarr', 'tibi', 'calin']

    const registeredPlayers = (playerData: Array<string>) => {
        return playerData.map((playerName, index) => {
            return (
                <Row>
                    <Col key={index}  >
                        <PlayerView name={playerName} imageUrl={''} willPlay={index <= 11} ></PlayerView>
                    </Col>
                </Row>)
        })
    }

    return (
        <Container>
            {registeredPlayers(playerData)}
            <Button className={classes.registerButton} variant="primary">Register Now</Button>
        </Container>
    )
}

export default EventRegistrationWidget;