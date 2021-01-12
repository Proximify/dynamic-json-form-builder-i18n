import React from "react";
import Identification from './Identification';
import CountryOfCitizenship from "./CountryOfCitizenship";


export default function PersonalInformation(props) {
    // sub
    console.log("PersonalInformation",props);

    const sections = {
        "identification": <Identification fields={props.fields} values={props.values}/>,
        "country_of_citizenship": <CountryOfCitizenship fields={props.fields} values={props.values}/>
    }

    return (
        <React.Fragment>
            {sections[props.section]}
        </React.Fragment>
    )
}