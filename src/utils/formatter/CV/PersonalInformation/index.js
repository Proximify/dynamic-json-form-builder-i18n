import React from "react";
import Identification from "./Identification";
import LanguageSkills from "./LanguageSkills";
import Address from "./Address";
import Telephone from "./Telephone";

export default function PersonalInformation(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "identification": <Identification structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "language_skills": <LanguageSkills structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "address": <Address structureChain={props.structureChain}
                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                  rawData={props.rawData}/>,
        "telephone":<Telephone structureChain={props.structureChain}
                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                             rawData={props.rawData}/>,
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}