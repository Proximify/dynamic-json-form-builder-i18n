import React from "react";
import TeachingActivities from "./TeachingActivities";
import SupervisoryActivities from "./SupervisoryActivities";
import AdministrativeActivities from "./AdministrativeActivities";
import AdvisoryActivities from "./AdvisoryActivities";
import AssessmentAndReviewActivities from "./AssessmentAndReviewActivities";
import ParticipationActivities from "./ParticipationActivities";
import CommunityAndVolunteerActivities from "./CommunityAndVolunteerActivities";
import KnowledgeAndTechnologyTranslation from "./KnowledgeAndTechnologyTranslation";
import InternationalCollaborationActivities from "./InternationalCollaborationActivities";


export default function Activities(props) {
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
        "participation_activities": <ParticipationActivities structureChain={props.structureChain}
                                                                           isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                           rawData={props.rawData}/>,
        "community_and_volunteer_activities": <CommunityAndVolunteerActivities structureChain={props.structureChain}
                                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                             rawData={props.rawData}/>,
        "knowledge_and_technology_translation": <KnowledgeAndTechnologyTranslation structureChain={props.structureChain}
                                                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                               rawData={props.rawData}/>,
        "international_collaboration_activities": <InternationalCollaborationActivities structureChain={props.structureChain}
                                                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                                   rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}