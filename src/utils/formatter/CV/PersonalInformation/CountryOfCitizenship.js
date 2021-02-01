import React from "react";

export default function CountryOfCitizenship(props) {
    console.log("CountryOfCitizenship", props)

    return (
        <React.Fragment>
            {props.values ? <small>{props.values["country_of_citizenship"]}</small> : null}
        </React.Fragment>
    )
}