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
import {Checkbox} from "@mui/material";

type TeamGeneratorWidgetProp = {
    teamVariations: TeamVariation[]
}

const GenerateIcon = styled.img`
    width: 120px;
    margin: 15px
`

const VariationWithCheckbox = styled.span`
    display: flex;
    text-align: start;
    padding: 10px;
`

const TeamGeneratorWrapper = styled.div`
    padding: 20px;
`

const TeamGeneratorWidget: React.FC<TeamGeneratorWidgetProp> = (props) => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);
    const teamVariations = useSelector(state => state.latestEvent.teamVariations);
    const [showGenerateButton, setShowGenerateButton] = useState(props.teamVariations.length === 0)

    const updateVariationSelection = (selectedIndex: number) => {
        dispatch(latestEventActions.updateVariationSelection({selectedIndex: selectedIndex}));
    };

    const teamVariationList = () => {
        return teamVariations.map((variation: TeamVariation, index) => {
            return (
                <Row>
                    <Col key={index} >
                        <VariationWithCheckbox>
                            {selectedVariationsNumber() === 3 && !variation.selectedForVoting &&
                                <Checkbox disabled checked={variation.selectedForVoting} />}
                            {(selectedVariationsNumber() !== 3 || (selectedVariationsNumber() === 3 && variation.selectedForVoting)) &&
                                <Checkbox checked={variation.selectedForVoting} onClick={() => updateVariationSelection(index)}/> }
                            <TeamVariationBox variation={variation} ></TeamVariationBox>
                        </VariationWithCheckbox>
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
                    setShowGenerateButton(false)
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

    const updateSelections = (event) => {
        event.preventDefault();

        const selectedVariationIdsParam =
            teamVariations.filter((v: TeamVariation) => v.selectedForVoting).map( (variation: TeamVariation) => variation.variationId).join(",");

        dispatch(latestEventActions.updateVariationSelectionsRequest());

        fetch(`${API_URL}/event/update-variation-selection?ids=${selectedVariationIdsParam}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                res.json().then((data) => {
                    dispatch(latestEventActions.updateVariationSelectionsSuccess({data: data}));
                });
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for team generation failed';
                    dispatch(latestEventActions.updateVariationSelectionsFailure({
                        loadingError: errorMessage
                    }));
                });
            }
        });
    }

    const submitHandler = (event) => {
        if (selectedVariationsNumber() === 3) {
            updateSelections(event)
        } else {
            generateTeams(event);
        }
    }

    const selectedVariationsNumber = () => {
        return teamVariations.filter((v: TeamVariation) => v.selectedForVoting).length;
    }

    return (
        <div className={classes.teamGenerator }>
            <TeamGeneratorWrapper>
                <form onSubmit={submitHandler}>
                    <div>
                        <GenerateIcon className={classes.avatarIcon} alt="generate-icon" src={generateIcon}
                                      data-testid='generate-icon'/>
                    </div>

                    {showGenerateButton &&
                        <Button type="submit" variant="primary" data-testid='generate-teams-button'>
                            Generate teams
                        </Button>}
                    {!showGenerateButton &&
                        <p>Select 3 variations</p> }
                    {selectedVariationsNumber() === 3 &&
                        <Button type="submit" variant="primary" data-testid='save-selections-button'>
                            Update selection
                        </Button>}
                </form>
            </TeamGeneratorWrapper>

            {teamVariationList()}
        </div>
    );
}

export default TeamGeneratorWidget;