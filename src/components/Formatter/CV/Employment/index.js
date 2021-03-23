import React from "react";
import AcademicWorkExperience from "./AcademicWorkExperience";
import NonAcademicWorkExperience from "./NonAcademicWorkExperience";
import Affiliations from "./Affiliations";
import LeavesOfAbsenceAndImpactOnResearch from "./LeavesOfAbsenceAndImpactOnResearch";


export default function Employment(props) {
    const subsections = {
        "academic_work_experience": <AcademicWorkExperience structureChain={props.structureChain}
                                                            isFullScreenViewMode={props.isFullScreenViewMode}
                                                            schema={props.schema}
                                                            rawData={props.rawData}/>,
        "non-academic_work_experience": <NonAcademicWorkExperience structureChain={props.structureChain}
                                                                   isFullScreenViewMode={props.isFullScreenViewMode}
                                                                   schema={props.schema}
                                                                   rawData={props.rawData}/>,
        "affiliations": <Affiliations structureChain={props.structureChain}
                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                      rawData={props.rawData}/>,
        "leaves_of_absence_and_impact_on_research": <LeavesOfAbsenceAndImpactOnResearch
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