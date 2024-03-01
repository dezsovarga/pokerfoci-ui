import React from "react";
import classes from "./EventLogs.module.css";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

type EventLogsProp = {
    logs: EventLog[];
}

type EventLog = {
    logMessage: string;
    logTime: Date;
}

const eventLogs = (logs) => {
    return logs.map((log) => {
        return (
            <p> <Moment format="MMM DD hh:mm">{log.logTime}</Moment>: {log.logMessage} </p>)
    })
}

const EventLogs: React.FC<EventLogsProp> = (props) => {

    return (
        <Card className={classes.eventLogs}>
            {eventLogs(props.logs)}

        </Card>
    )
}

export default EventLogs