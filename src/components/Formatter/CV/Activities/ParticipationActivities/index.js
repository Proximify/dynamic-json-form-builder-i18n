import React from "react";
import EventParticipation from "./EventParticipation";
import {GenericFormFormatter} from "../../../utils/GenericFormFormatter";


export default function ParticipationActivities(props) {
    const subsections = {
        "event_participation": <EventParticipation structureChain={props.structureChain}
                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                        rawData={props.rawData}/>,
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : GenericFormFormatter(props)}
        </React.Fragment>
    )
}