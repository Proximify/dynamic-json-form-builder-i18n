import React from "react";
import Degree from "./Degrees";
import Credentials from "./Credentials";
import ContinuousProfessionalDevelopment from "./ContinuousProfessionalDevelopment";

export default function Education(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "degrees": <Degree structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "credentials": <Credentials structureChain={props.structureChain}
                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                               rawData={props.rawData}/>,
        "continuous_professional_development": <ContinuousProfessionalDevelopment structureChain={props.structureChain}
                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                    rawData={props.rawData}/>,
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}