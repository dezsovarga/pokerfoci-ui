import React from 'react';
import classes from './Home.module.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import EventRegistrationWidget from "./EventRegistrationWidget";
import EventLogs from "./EventLogs";
import {useSelector} from "react-redux";
import Moment from 'react-moment';
import {useLoadLatestEvent} from "../../hooks/useAdminService";

const Home: React.FC = () => {
    const eventData = useSelector(state => state.latestEvent.latestEventData);
    const eventLogs = useSelector(state => state.latestEvent.eventLogs);

    useLoadLatestEvent('/event/latest');

    return (
        <section className={classes.starting} data-testid='home-page'>
            <Container className={classes.mainContainer}>
                <Row>
                    <Col >
                        <EventLogs logs={eventLogs}/>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                        <Card className={classes.eventRegistrationWidget} data-testid='registered-players-widget-header'>
                            <Card.Header className={classes.registeredPlayersHeader}>
                                <h5>Registered players for </h5>
                                <Moment format="YYYY/MM/DD">{eventData.eventDateTime}</Moment>
                            </Card.Header>
                            <Card.Body >
                                <Card.Text>
                                    <EventRegistrationWidget></EventRegistrationWidget>
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