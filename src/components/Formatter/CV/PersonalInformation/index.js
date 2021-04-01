import React from "react";
import Identification from "./Identification";
import LanguageSkills from "./LanguageSkills";
import Address from "./Address";
import Telephone from "./Telephone";
import Email from "./Email";
import Website from "./Website";
import {GenericFormFormatter} from "../../utils/GenericFormFormatter";

export default function PersonalInformation(props) {
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
        "telephone": <Telephone structureChain={props.structureChain}
                                isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                rawData={props.rawData}/>,
        "email": <Email structureChain={props.structureChain}
                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                        rawData={props.rawData}/>,
        "website": <Website structureChain={props.structureChain}
                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                          rawData={props.rawData}/>,
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : GenericFormFormatter(props)}
        </React.Fragment>
    )
}