import React from "react";
import Degree from "./Degrees";

export default function Education(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "degrees": <Degree structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}