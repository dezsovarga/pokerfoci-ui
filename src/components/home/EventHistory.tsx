import React from "react";
import classes from "./EventHistory.module.css";
import {Card} from "react-bootstrap";

const EventHistory: React.FC = () => {

    return (
        <Card className={classes.eventHistory}>
            <p> 2024-Feb-16: horvathkuki registered to event </p>

        </Card>
    )

}

export default EventHistory