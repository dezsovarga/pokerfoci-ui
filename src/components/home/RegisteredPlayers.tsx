import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import PlayerView from "./PlayerView";

const RegisteredPlayers: React.FC = (props) => {

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
        </Container>
    )
}

export default RegisteredPlayers;