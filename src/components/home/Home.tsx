import React from 'react';
import classes from './Home.module.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import RegisteredPlayers from "./RegisteredPlayers";

const Home: React.FC = () => {

    return (
        <section className={classes.starting} data-testid='home-page'>
            <Container className={classes.mainContainer}>
                <Row>
                    <Col >
                        1 of 2
                    </Col>
                    <Col xs={12} md={4} lg={3}>
                        <Card>
                            <Card.Header className={classes.registeredPlayersHeader}>
                                <h5>Registered players for next event</h5>
                            </Card.Header>
                            <Card.Body >
                                <Card.Text>
                                    <RegisteredPlayers></RegisteredPlayers>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </section>
    )
}

export default Home