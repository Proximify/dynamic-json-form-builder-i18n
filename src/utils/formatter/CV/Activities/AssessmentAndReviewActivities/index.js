import React from "react";
import JournalReviewActivities from "./JournalReviewActivities";
import ConferenceReviewActivities from "./ConferenceReviewActivities";
import GraduateExaminationActivities from "./GraduateExaminationActivities";
import ResearchFundingApplicationAssessmentActivities from "./ResearchFundingApplicationAssessmentActivities";
import PromotionTenureAssessmentActivities from "./PromotionTenureAssessmentActivities";
import OrganizationalReviewActivities from "./OrganizationalReviewActivities";

export default function AssessmentAndReviewActivities(props) {

    const subsections = {
        "journal_review_activities": <JournalReviewActivities structureChain={props.structureChain}
                                                              isFullScreenViewMode={props.isFullScreenViewMode}
                                                              schema={props.schema}
                                                              rawData={props.rawData}/>,
        "conference_review_activities": <ConferenceReviewActivities structureChain={props.structureChain}
                                                                    isFullScreenViewMode={props.isFullScreenViewMode}
                                                                    schema={props.schema}
                                                                    rawData={props.rawData}/>,
        "graduate_examination_activities": <GraduateExaminationActivities structureChain={props.structureChain}
                                                                          isFullScreenViewMode={props.isFullScreenViewMode}
                                                                          schema={props.schema}
                                                                          rawData={props.rawData}/>,
        "research_funding_application_assessment_activities": <ResearchFundingApplicationAssessmentActivities
            structureChain={props.structureChain}
            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
            rawData={props.rawData}/>,
        "promotion_tenure_assessment_activities": <PromotionTenureAssessmentActivities
            structureChain={props.structureChain}
            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
            rawData={props.rawData}/>,
        "organizational_review_activities": <OrganizationalReviewActivities
            structureChain={props.structureChain}
            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
            rawData={props.rawData}/>,
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}