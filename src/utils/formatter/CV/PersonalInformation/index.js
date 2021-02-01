import React from "react";
import Identification from "./Identification";
import CountryOfCitizenship from "./CountryOfCitizenship";
import LanguageSkills from "./LanguageSkills";
import CVFormatter from "../index";


export default function PersonalInformation(props) {
    // console.log("PersonalInformation", props);

    const subsections = {
        "identification": <Identification structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "language_skills": <LanguageSkills structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "country_of_citizenship": <CountryOfCitizenship/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}

        </React.Fragment>
    )
}