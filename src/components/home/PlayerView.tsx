import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import classes from './PlayerView.module.css';
import avatarIcon from "../../assets/avatar.png";


type PlayerViewProps = {
    name: string;
    imageUrl: string;
    willPlay: boolean;
}

const PlayerView: React.FC<PlayerViewProps> = (props) => {

    return (
        <Card style={{
            backgroundColor: props.willPlay ? '#c6f7cc' : 'lightpink',
            margin: 2
        }} >
            <Card.Body>
                <Row>
                    <Col className={classes.playerNameAlign}>
                        <img className={classes.registeredPlayerAvatarIcon} alt="avatar-icon" src={avatarIcon} data-testid='avatar-icon'/>
                        {props.name}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )

}

export default PlayerView;