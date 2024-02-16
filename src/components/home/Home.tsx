import React, {useEffect} from 'react';
import classes from './Home.module.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import EventRegistrationWidget from "./EventRegistrationWidget";
import EventHistory from "./EventHistory";
import {latestEventActions} from "../../store/latest-event-slice";
import {API_URL} from "../../Constants";
import {useDispatch, useSelector} from "react-redux";
import Moment from 'react-moment';

const Home: React.FC = () => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);
    const eventData = useSelector(state => state.latestEvent.latestEventData);

    async function loadLatestEvent() {
        dispatch(latestEventActions.loadLatestEventRequest());

        const response = await fetch(`${API_URL}/event/latest`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(latestEventActions.loadLatestEventFailure({
                loadingError: err.message
            }));
        });
        const data = await response.json();
        if (response.status !== 200) {
            dispatch(latestEventActions.loadLatestEventFailure({
                loadingError: data.reason || data.error
            }));
        } else {
            dispatch(latestEventActions.loadLatestEventSuccess({data: data}));
        }
    }

    useEffect(() => {
        loadLatestEvent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={classes.starting} data-testid='home-page'>
            <Container className={classes.mainContainer}>
                <Row>
                    <Col >
                        <EventHistory />
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