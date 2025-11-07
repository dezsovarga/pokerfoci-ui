import React from "react";
import {PlayerData} from "../../../home/EventRegistrationWidget";
import styled from "styled-components";
import SoccerField from "../voting/SoccerField";

type Team = {
    skillSum: number,
    teamMembers: PlayerData[],
}

export type TeamVariation = {
    team1: Team,
    team2: Team,
    skillDifference: number,
    selectedForVoting: boolean,
    variationId: number
}

export type TeamVariationProp = {
    variation: TeamVariation
}

const TeamVariationBox: React.FC<TeamVariationProp> = (props) => {
    return <SoccerField variation={props.variation} />;
}

export default TeamVariationBox;