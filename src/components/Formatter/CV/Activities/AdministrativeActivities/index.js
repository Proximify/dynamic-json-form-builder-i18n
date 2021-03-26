import React from "react";
import EventAdministration from "./EventAdministration";
import EditorialActivities from "./EditorialActivities";
import OtherAdministrativeActivities from "./OtherAdministrativeActivities";

export default function AdministrativeActivities(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "event_administration": <EventAdministration structureChain={props.structureChain}
                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                        rawData={props.rawData}/>,
        "editorial_activities": <EditorialActivities structureChain={props.structureChain}
                                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                 rawData={props.rawData}/>,
        "other_administrative_activities": <OtherAdministrativeActivities structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                     rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}