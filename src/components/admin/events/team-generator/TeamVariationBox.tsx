import React from "react";
import {PlayerData} from "../../../home/EventRegistrationWidget";
import {Card, Col, Row} from "react-bootstrap";
import styled from "styled-components";
import SoccerField from "../voting/SoccerField";

type Team = {
    skillSum: number,
    teamMembers: PlayerData[],
}

export type TeamVariation = {
    team1: Team,
    team2: Team,
    skillDifference: number,
    selectedForVoting: boolean,
    variationId: number
}

export type TeamVariationProp = {
    variation: TeamVariation
}

const VariationContent = styled.div`
    text-align: start;
    max-width: 300px;
`

const TeamVariationBox: React.FC<TeamVariationProp> = (props) => {

    const listTeamMembers = (team: Team) => {
        return team.teamMembers.map((player) => {
            return (<div> {player.username} </div>)
        })
    }

    const variationBox = () => {
        return (
            <Card style={{
                backgroundColor: 'lightgray',
                margin: 2,
            }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <VariationContent>
                                <Row>
                                    Skill difference: {props.variation.skillDifference}
                                </Row>
                                <Row>
                                    <Col> {listTeamMembers(props.variation.team1)}</Col>
                                    <Col> {listTeamMembers(props.variation.team2)}</Col>
                                </Row>
                            </VariationContent>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
    return <SoccerField variation={props.variation} />;

}

export default TeamVariationBox;