import React, {useState} from "react";
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
import {useSelector} from "react-redux";
import {useLoadLatestEvent} from "../../../hooks/useAdminService";

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

    const eventData = useSelector(state => state.latestEvent.latestEventData);

    useLoadLatestEvent('/event/latest');

    const steps :string[] = ["Event created", "Manage players","Generate teams",
        "Voting", "Publish results", "Introduce score", "Event completed"]

    const [activeStep, setActiveStep] = useState(1);

    const handleStepNumberChange = (stepDirection: number) => {
        setActiveStep(activeStep + stepDirection)
    }

    const CurrentStepComponent = (stepNumber: number) => {
        switch (stepNumber) {
            case 1:
                return <ManageRegisteredPlayers></ManageRegisteredPlayers>
            case 2:
                return <TeamGeneratorWidget teamVariations={ eventData.teamVariations } />
            case 3:
                console.log("Step 3 component not yet implemented");
                break;
            default:
                console.log("Unknown step component.");
                break;
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Stepper activeStep={activeStep} orientation="vertical">
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
                                            { CurrentStepComponent(activeStep) }
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