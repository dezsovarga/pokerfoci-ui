import React, {ReactNode} from 'react';
import { Col } from "react-bootstrap";
import {CheckCircle, CheckCircleFill} from 'react-bootstrap-icons';
import styled from 'styled-components';

type EventStatusBarProp = {
    stepNumber: number
}

const EventSteps = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

const EventStepWrapper = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const IconWithLine = styled.div`
    display: flex;
`;

const LineBetweenSteps = styled.div`
    margin: 11px;
    border-width: 1px;
    height: 3px;
    width: 100%;
    background-color: royalblue;
`;

const StepNameDone = styled.p`
    justify-content: start;
`;

const StepNameTBD = styled.p`
    color: #D3D3D3;
    justify-content: start;
`;

const StepNameCurrent = styled.p`
    font-weight: bold;
    justify-content: start;
`;


const EventStatusBar: React.FC<EventStatusBarProp> = (props) => {

    const stepNameList:string[] = ["Event created", "Manage players","Generate teams",
        "Voting", "Publish results", "Introduce score", "Event completed"]

    const eventStep = (stepStatus: string, stepName: string) => {
        const isDone: boolean = stepStatus === "DONE";
        const isCurrent: boolean = stepStatus === "CURRENT";

        const StepNameComponent = isDone ? StepNameDone : isCurrent ? StepNameCurrent : StepNameTBD;
        const iconColor: string  = isDone || isCurrent ? "royalblue" : "#D3D3D3";
        const lineStyle = !isDone ? { backgroundColor: "#D3D3D3" } : {};

        return (
            <Col>
                <EventStepWrapper>
                    <IconWithLine>
                        <div>
                            {isDone && <CheckCircleFill color="royalblue" size={26} />}
                            {!isDone && <CheckCircle color={iconColor} size={26} />}
                            <StepNameComponent> {stepName} </StepNameComponent>
                        </div>
                        {stepName !== "Event completed" && <LineBetweenSteps style={lineStyle} />}
                    </IconWithLine>
                </EventStepWrapper>
            </Col>
        );
    };

    const eventStepList = (stepNumber: number):ReactNode => {
          return stepNameList.map((stepName: string, index:number):ReactNode => {
              return eventStep(
                 index < stepNumber ? "DONE" : index === stepNumber ? "CURRENT" : "TBD",
                 stepName
             )
        })
    }

    return (
        <EventSteps>
            { eventStepList( props.stepNumber) }

        </EventSteps>
    )
}

export default EventStatusBar