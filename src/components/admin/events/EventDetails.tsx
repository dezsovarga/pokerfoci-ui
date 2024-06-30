import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {PlayerData} from "../../home/EventRegistrationWidget";
import AdminRegisteredPlayers from "./AdminRegisteredPlayers";
import TeamGeneratorWidget from "./team-generator/TeamGeneratorWidget";

type EventDetailsProp = {
    status: string
    registeredPlayers: PlayerData[],
    teamVariations: {
        team1: PlayerData[],
        team2: PlayerData[],
        skillDifference: number
    }
}

const EventDetails: React.FC<EventDetailsProp> = (props) => {

    return (
        <Container>
            <Row>
                <Col xs={12} md={6} lg={4}>
                    <AdminRegisteredPlayers registeredPlayers={props.registeredPlayers}></AdminRegisteredPlayers>
                </Col>
                <Col xs={12} md={6} lg={8} >
                    <TeamGeneratorWidget teamVariations={ props.teamVariations } />
                </Col>
            </Row>
        </Container>
    )
}

export default EventDetails;