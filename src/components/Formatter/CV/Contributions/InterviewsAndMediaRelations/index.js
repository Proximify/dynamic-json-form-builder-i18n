import React from "react";
import BroadcastInterviews from "./BroadcastInterviews";
import TextInterviews from "./TextInterviews";
import BroadcastNarratives from "./BroadcastNarratives";

export default function InterviewsAndMediaRelations(props) {

    const subsections = {
        "broadcast_interviews": <BroadcastInterviews structureChain={props.structureChain}
                                                                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                            rawData={props.rawData}/>,
        "text_interviews": <TextInterviews structureChain={props.structureChain}
                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                               rawData={props.rawData}/>,
        "broadcast_narratives": <BroadcastNarratives structureChain={props.structureChain}
                                           isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                           rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}