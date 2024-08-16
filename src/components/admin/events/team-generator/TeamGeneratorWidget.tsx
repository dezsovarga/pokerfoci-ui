import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import classes from "./TeamGeneratorWidget.module.css";
import {API_URL} from "../../../../Constants";
import {latestEventActions} from "../../../../store/latest-event-slice";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import TeamVariationBox, {TeamVariation} from "./TeamVariationBox";
import generateIcon from "../../../../assets/generate_icon.png";
import styled from "styled-components";

type TeamGeneratorWidgetProp = {
    teamVariations: TeamVariation[]
}

const GenerateIcon = styled.img`
    width: 120px;
    margin: 15px
`

const TeamGeneratorWrapper = styled.div`
    padding: 20px;
`

const TeamGeneratorWidget: React.FC<TeamGeneratorWidgetProp> = (props) => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);
    const [teamVariationsFromState, setTeamVariationsFromState] = useState(null);

    const teamVariationList = () => {
        const teamVariationList = teamVariationsFromState ?? props.teamVariations;
        return teamVariationList.map((variation, index) => {
            return (
                <Row>
                    <Col key={index}  >
                        <TeamVariationBox variation={variation} ></TeamVariationBox>
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
                    setTeamVariationsFromState(data.teamVariations)
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
            <TeamGeneratorWrapper>
                <form onSubmit={submitHandler}>
                    <div>
                        <GenerateIcon className={classes.avatarIcon} alt="generate-icon" src={generateIcon}
                                      data-testid='generate-icon'/>
                    </div>

                    <Button type="submit" variant="primary"
                            data-testid='manage-players-button'>
                        Generate teams
                    </Button>
                </form>
            </TeamGeneratorWrapper>

            {teamVariationList()}
        </div>
    );
}

export default TeamGeneratorWidget;