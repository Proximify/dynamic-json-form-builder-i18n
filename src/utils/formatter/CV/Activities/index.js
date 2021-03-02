import React from "react";
import TeachingActivities from "./TeachingActivities";


export default function Activities(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "teaching_activities": <TeachingActivities structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        // "language_skills": <LanguageSkills structureChain={props.structureChain}
        //                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                    rawData={props.rawData}/>,
        // "address": <Address structureChain={props.structureChain}
        //                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                     rawData={props.rawData}/>,
        // "telephone": <Telephone structureChain={props.structureChain}
        //                         isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                         rawData={props.rawData}/>,
        // "email": <Email structureChain={props.structureChain}
        //                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                 rawData={props.rawData}/>,
        // "website": <Website structureChain={props.structureChain}
        //                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                     rawData={props.rawData}/>,
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}