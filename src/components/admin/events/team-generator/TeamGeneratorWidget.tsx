import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./TeamGeneratorWidget.module.css";
import {API_URL} from "../../../../Constants";
import {latestEventActions} from "../../../../store/latest-event-slice";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import TeamVariation from "./TeamVariation";

type TeamGeneratorWidgetProp = {
    teamVariations: TeamVariation[]
}

const TeamGeneratorWidget: React.FC<TeamGeneratorWidgetProp> = (props) => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);

    const teamVariationList = () => {
        return props.teamVariations.map((variation, index) => {
            return (
                <Row>
                    <Col key={index}  >
                        <TeamVariation variation={variation} ></TeamVariation>
                    </Col>
                </Row>)
        })
    }

    const generateTeams = (event) => {
        event.preventDefault();
        dispatch(latestEventActions.generateTeamsRequest());

        fetch(`${API_URL}/event/generate-teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                res.json().then((data) => {
                    dispatch(latestEventActions.generateTeamsSuccess({data: data}));
                });
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for team generation failed';
                    dispatch(latestEventActions.generateTeamsFailure({
                        loadingError: errorMessage
                    }));
                });
            }
        });
    }

    const submitHandler = (event) => {
         generateTeams(event);
    }

    return (
        <div className={classes.teamGenerator }>
            <form onSubmit={submitHandler}>
                <Button type="submit" variant="primary"
                        data-testid='manage-players-button'>
                    Generate teams
                </Button>
            </form>
            {teamVariationList()}
        </div>
    );
}

export default TeamGeneratorWidget;