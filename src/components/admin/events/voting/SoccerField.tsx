import React from "react";
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {TeamVariationProp} from "../team-generator/TeamVariationBox";
import {CircleFill} from "react-bootstrap-icons";

const SoccerFieldContainer = styled.div`
    width: 210px;
    height: 322px;
    background-image: url("/soccer_field.png");
    background-size: cover;
    background-repeat: no-repeat;
`

const Player = styled.div`
    text-align: center;
`
const PlayerName = styled.div`
    color: white;
    font-size: 11px;
    font-weight: bold;
`

const PlayerPost = styled.div`
    padding-top: 10px;
`

const SoccerField: React.FC<TeamVariationProp> = (props) => {

    const players = props.variation.team1.teamMembers.concat(props.variation.team2.teamMembers);
    const player = (playerName: string, playerNumber: number, playerColor: string) => {
        return <Player>
            <div>
                <CircleFill color={playerColor} size={25} style={{ stroke: "white", strokeWidth: 1 }} />
            </div>
            <PlayerName> {playerName} </PlayerName>
        </Player>
    }

    return <SoccerFieldContainer>
        <PlayerPost>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    {player(players[0].username, 8, "blue")}
                </Col>
            </Row>
        </PlayerPost>
        <PlayerPost>
            <Row>
                <Col xs={4} md={4} lg={4}>
                    {player(players[1].username, 8, "blue")}
                </Col>
                <Col xs={4} md={4} lg={4}>
                    {player(players[2].username, 8, "blue")}
                </Col>
                <Col xs={4} md={4} lg={4}>
                    {player(players[3].username, 8, "blue")}
                </Col>
            </Row>
        </PlayerPost>
        <PlayerPost>
            <Row>
                <Col xs={3} md={3} lg={3} />
                <Col xs={3} md={3} lg={3}>
                    {player(players[4].username, 8, "blue")}
                </Col>

                <Col xs={3} md={3} lg={3}>
                    {player(players[5].username, 8, "blue")}
                </Col>
                <Col xs={3} md={3} lg={3} />

            </Row>
        </PlayerPost>

        <PlayerPost>
            <Row>
                <Col xs={3} md={3} lg={3} />
                <Col xs={3} md={3} lg={3}>
                    {player(players[6].username, 8, "red")}
                </Col>

                <Col xs={3} md={3} lg={3}>
                    {player(players[7].username, 8, "red")}
                </Col>
                <Col xs={3} md={3} lg={3} />

            </Row>
        </PlayerPost>
        <PlayerPost>
            <Row>
                <Col xs={4} md={4} lg={4}>
                    {player(players[8].username, 8, "red")}
                </Col>
                <Col xs={4} md={4} lg={4}>
                    {player(players[9].username, 8, "red")}
                </Col>
                <Col xs={4} md={4} lg={4}>
                    {player(players[10].username, 8, "red")}
                </Col>
            </Row>
        </PlayerPost>
        <PlayerPost>
            <Row>
                <Col xs={12} md={12} lg={12}>
                    {player(players[11].username, 8, "red")}
                </Col>
            </Row>
        </PlayerPost>

    </SoccerFieldContainer>;
}

export default SoccerField