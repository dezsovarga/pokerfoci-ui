import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import ManageRegisteredPlayers from "./ManageRegisteredPlayers";
import Button from '@mui/material/Button';
import styled from "styled-components";
import TeamGeneratorWidget from "./team-generator/TeamGeneratorWidget";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from "react-redux";
import {useLoadLatestEvent} from "../../../hooks/useAdminService";
import {latestEventActions} from "../../../store/latest-event-slice";
import {API_URL} from "../../../Constants";
import VotingStep from "./voting/VotingStep";

const PreviousStep = styled.div`
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StepComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EventDetails: React.FC = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.login.token);
    const eventData = useSelector(state => state.latestEvent.latestEventData);
    const activeStepNumber = useSelector(state => state.latestEvent.activeStepNumber);

    useLoadLatestEvent('/event/latest');

    const steps :string[] = ["Event created", "Manage players","Generate teams",
        "Voting", "Publish results", "Introduce score", "Event completed"]

    const getNewStatusBasedOnActiveStepNumber = (stepDirection: number):string => {
        switch (activeStepNumber + stepDirection) {
            case 0:
                return "INITIATED"
            case 1:
                return "MANAGEABLE";
            case 2:
                return "TEAM_GENERATION";
            case 3:
                return "VOTING";
            case 4:
                return "VOTING_RESULTS";
            default:
                return "INITIATED";
        }
    }

    const handleStepNumberChange = (stepDirection: number) => {
        if (activeStepNumber === 3 && stepDirection === 1 && eventData.votingEnabled === false) {
            createVoting();
        }
        const newStatusBasedOnActiveStep = getNewStatusBasedOnActiveStepNumber(stepDirection);
        updateEventStatus(newStatusBasedOnActiveStep);
    }

    const updateEventStatus = (eventStatus: string) => {
        dispatch(latestEventActions.saveEventStatusRequest());

        fetch(`${API_URL}/event/update-status?status=${eventStatus}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                res.json().then((data) => {
                    dispatch(latestEventActions.saveEventStatusSuccess({data: data}));
                });
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for updating event status failed';
                    dispatch(latestEventActions.saveEventStatusFailure({
                        loadingError: errorMessage
                    }));
                });
            }
        });
    }

    const createVoting = () => {
        dispatch(latestEventActions.createVotingRequest());

        fetch(`${API_URL}/event/create-voting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                res.json().then((data) => {
                    dispatch(latestEventActions.createVotingSuccess({data: data}));
                });
            } else {
                res.json().then((data) => {
                    let errorMessage = data.reason || 'Request for updating event status failed';
                    dispatch(latestEventActions.createVotingFailure({
                        loadingError: errorMessage
                    }));
                });
            }
        });
    }

    const CurrentStepComponent = (stepNumber: number) => {

        switch (stepNumber) {
            case 0:
                return 'A new event was created by the admin on XX Date'
            case 1:
                return <ManageRegisteredPlayers></ManageRegisteredPlayers>
            case 2:
                return <TeamGeneratorWidget teamVariations={ eventData.teamVariations } />
            case 3:
                console.log("Step 3 component not yet implemented");
                return <VotingStep/>
            case 4:
                console.log("Step 4 component not yet implemented");
                return 'Publish voting results'
            case 5:
                console.log("Step 5 component not yet implemented");
                return 'Introduce score'
            default:
                console.log("Unknown step component.");
                break;
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Stepper activeStep={activeStepNumber} orientation="vertical">
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                    <StepContent>
                                        <StepComponent>
                                            { CurrentStepComponent(activeStepNumber) }
                                        </StepComponent>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleStepNumberChange(1)}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={() => handleStepNumberChange(-1)}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6} lg={12}>
                    <PreviousStep>
                        <Button onClick={() => handleStepNumberChange(-1)}>Prev</Button>
                        <Button onClick={() => handleStepNumberChange(1)}>Next</Button>

                    </PreviousStep>
                </Col>
            </Row>
        </Container>
    )
}

export default EventDetails;