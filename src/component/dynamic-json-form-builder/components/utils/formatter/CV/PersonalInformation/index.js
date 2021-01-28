import React from "react";
import Identification from "./Identification";
import CountryOfCitizenship from "./CountryOfCitizenship";
import LanguageSkill from "./LanguageSkill";
import CVFormatter from "../index";


export default function PersonalInformation(props) {
    console.log("PersonalInformation", props);

    const subsections = {
        "identification": <Identification structureChain={props.structureChain}
                                          isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                          rawData={props.rawData}/>,
        "language_skill": <LanguageSkill/>,
        "country_of_citizenship": <CountryOfCitizenship/>
    }

    return (
        <React.Fragment>
            {/*{form[props.form] ?? (Object.keys(props.rawData).map((key,index) => {*/}
            {/*    return (*/}
            {/*        <div key={index}>*/}
            {/*            <span className="font-bold">{key}</span>: {props.rawData[key]}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}))}*/}
            {subsections[props.structureChain.shift()]}

        </React.Fragment>
    )
}