import React from "react";
import Presentations from "./Presentations";
import InterviewsAndMediaRelations from "./InterviewsAndMediaRelations";
import Publications from "./Publications";
import ArtisticContributions from "./ArtisticContributions";

export default function Contributions(props) {
    const subsections = {
        "presentations": <Presentations structureChain={props.structureChain}
                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                   rawData={props.rawData}/>,
        "interviews_and_media_relations": <InterviewsAndMediaRelations structureChain={props.structureChain}
                                                         isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                         rawData={props.rawData}/>,
        "publications": <Publications structureChain={props.structureChain}
                                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                               rawData={props.rawData}/>,
        "artistic_performances": <ArtisticContributions structureChain={props.structureChain}
                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                      rawData={props.rawData}/>,
        // "advisory_activities": <AdvisoryActivities structureChain={props.structureChain}
        //                                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                            rawData={props.rawData}/>,
        // "assessment_and_review_activities": <AssessmentAndReviewActivities structureChain={props.structureChain}
        //                                                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                                                    rawData={props.rawData}/>,
        // "participation_activities": <ParticipationActivities structureChain={props.structureChain}
        //                                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                                      rawData={props.rawData}/>,
        // "community_and_volunteer_activities": <CommunityAndVolunteerActivities structureChain={props.structureChain}
        //                                                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                                                        rawData={props.rawData}/>,
        // "knowledge_and_technology_translation": <KnowledgeAndTechnologyTranslation structureChain={props.structureChain}
        //                                                                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                                                            rawData={props.rawData}/>,
        // "international_collaboration_activities": <InternationalCollaborationActivities structureChain={props.structureChain}
        //                                                                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                                                                 rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}