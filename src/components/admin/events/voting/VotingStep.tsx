import React from "react";
import TeamVariationBox, {TeamVariation} from "../team-generator/TeamVariationBox";
import {Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {VariationWithCheckbox} from "../team-generator/TeamGeneratorWidget";


const VotingStep = () => {

    const teamVariations = useSelector(state => state.latestEvent.teamVariations);

    const selectedVariations = () => {
        return teamVariations.filter((v: TeamVariation) => v.selectedForVoting)
            .map((variation: TeamVariation, index) => {
            return (
                    <Col key={index} >
                        <VariationWithCheckbox>
                            <TeamVariationBox variation={variation} ></TeamVariationBox>
                        </VariationWithCheckbox>
                    </Col>
                )
        })
    }
    return <Container>
        <p>The following variations will be submitted for voting </p>

        <Row>
            {selectedVariations()}
        </Row>
    </Container>
}

export default VotingStep;