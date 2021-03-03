import React from "react";
import StudentPostdoctoralSupervision from "./StudentPostdoctoralSupervision";
import StaffSupervision from "./StaffSupervision";


export default function SupervisoryActivities(props) {

    const subsections = {
        "student_postdoctoral_supervision": <StudentPostdoctoralSupervision structureChain={props.structureChain}
                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                        rawData={props.rawData}/>,
        "staff_supervision": <StaffSupervision structureChain={props.structureChain}
                                                 isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                 rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}