import React from "react";
import JournalReviewActivities from "./JournalReviewActivities";
import ConferenceReviewActivities from "./ConferenceReviewActivities";

export default function AssessmentAndReviewActivities(props) {

    const subsections = {
        "journal_review_activities": <JournalReviewActivities structureChain={props.structureChain}
                                                                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                            rawData={props.rawData}/>,
        "conference_review_activities": <ConferenceReviewActivities structureChain={props.structureChain}
                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                               rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}