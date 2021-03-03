import React from "react";
import MentoringActivities from "./MentoringActivities";
import ExpertWitnessActivities from "./ExpertWitnessActivities";

export default function AdvisoryActivities(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "mentoring_activities": <MentoringActivities structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                     rawData={props.rawData}/>,
        "expert_witness_activities": <ExpertWitnessActivities structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                     rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}