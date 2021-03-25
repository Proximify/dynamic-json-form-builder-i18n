import React from "react";
import CourseTaught from "./CourseTaught";
import CourseDevelopment from "./CourseDevelopment";
import ProgramDevelopment from "./ProgramDevelopment";
import DirectedStudies from "./DirectedStudies";
import ClinicalTeaching from "./ClinicalTeaching";
import CaseDevelopment from "./CaseDevelopment";

export default function TeachingActivities(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "courses_taught": <CourseTaught structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "course_development": <CourseDevelopment structureChain={props.structureChain}
                                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                            rawData={props.rawData}/>,
        "program_development": <ProgramDevelopment structureChain={props.structureChain}
                                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                 rawData={props.rawData}/>,
        "directed_studies": <DirectedStudies structureChain={props.structureChain}
                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                   rawData={props.rawData}/>,
        "clinical_teaching": <ClinicalTeaching structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "case_development": <CaseDevelopment structureChain={props.structureChain}
                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                               rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}