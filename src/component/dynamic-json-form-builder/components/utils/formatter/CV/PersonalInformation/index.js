import React from "react";
import Identification from "./Identification";
import CountryOfCitizenship from "./CountryOfCitizenship";
import LanguageSkill from "./LanguageSkill";


export default function PersonalInformation(props) {
    console.log("PersonalInformation",props);

    const form = {
        "identification": <Identification rawData={props.rawData} isFullScreenViewMode={props.isFullScreenViewMode} fields={props.fields} values={props.values}/>,
        "language_skill": <LanguageSkill rawData={props.rawData} isFullScreenViewMode={props.isFullScreenViewMode} fields={props.fields} values={props.values} />,
        "country_of_citizenship": <CountryOfCitizenship fields={props.fields} values={props.values}/>
    }

    return (
        <React.Fragment>
            {form[props.form] ?? (Object.keys(props.rawData).map((key,index) => {
                return (
                    <div key={index}>
                        <span className="font-bold">{key}</span>: {props.rawData[key]}
                    </div>
                )
            }))}
        </React.Fragment>
    )
}