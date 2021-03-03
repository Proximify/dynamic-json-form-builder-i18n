import React from "react";
import TeachingActivities from "./TeachingActivities";
import SupervisoryActivities from "./SupervisoryActivities";
import AdministrativeActivities from "./AdministrativeActivities";
import AdvisoryActivities from "./AdvisoryActivities";
import AssessmentAndReviewActivities from "./AssessmentAndReviewActivities";


export default function Activities(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "teaching_activities": <TeachingActivities structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "supervisory_activities": <SupervisoryActivities structureChain={props.structureChain}
                                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                               rawData={props.rawData}/>,
        "administrative_activities": <AdministrativeActivities structureChain={props.structureChain}
                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                   rawData={props.rawData}/>,
        "advisory_activities": <AdvisoryActivities structureChain={props.structureChain}
                                           isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                           rawData={props.rawData}/>,
        "assessment_and_review_activities": <AssessmentAndReviewActivities structureChain={props.structureChain}
                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                            rawData={props.rawData}/>,
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