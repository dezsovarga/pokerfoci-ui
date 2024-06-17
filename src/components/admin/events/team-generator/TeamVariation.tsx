import React from "react";
import classes from "../AdminRegisteredPlayers.module.css";
import {PlayerData} from "../../../home/EventRegistrationWidget";
import {Card, Col, Row} from "react-bootstrap";
import avatarIcon from "../../../../assets/avatar.png";

type Team = {
    skillSum: number,
    teamMembers: PlayerData[],
}

export type TeamVariation = {
    team1: Team,
    team2: Team,
    skillDifference: number
}

type TeamVariationProp = {
    variation: TeamVariation
}

const TeamVariation: React.FC<TeamVariationProp> = (props) => {

    const listTeamMembers = (team: Team) => {
        return team.teamMembers.map((player) => {
            return player.username + " "
        })
    }

    return (
        <Card style={{
            backgroundColor: 'lightgray',
            margin: 2
        }} >
            <Card.Body>
                <Row>
                    <Col>
                        Skill difference: {props.variation.skillDifference} <br/>
                        Team 1: {listTeamMembers(props.variation.team1)} <br/>
                        Team 2: {listTeamMembers(props.variation.team2)}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default TeamVariation;