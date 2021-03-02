import React from "react";
import StudentPostdoctoralSupervision from "./StudentPostdoctoralSupervision";


export default function SupervisoryActivities(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "student_postdoctoral_supervision": <StudentPostdoctoralSupervision structureChain={props.structureChain}
                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                        rawData={props.rawData}/>,
        // "course_development": <CourseDevelopment structureChain={props.structureChain}
        //                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                          rawData={props.rawData}/>,
        // "program_development": <ProgramDevelopment structureChain={props.structureChain}
        //                                            isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                            rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}