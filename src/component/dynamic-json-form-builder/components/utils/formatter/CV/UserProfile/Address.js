import React from "react";

export default function Address(props) {
    // console.log("address", props)
    const formatter = {
        "street-number": <span><em>{props.values["street-number"]} </em></span>,
        "street-name": <span><i>{props.values["street-name"]} </i></span>,
        "country": <span><strong>{props.values["country"]}</strong></span>
    }
    return (
        <React.Fragment>
            {Object.keys(props.fields).map((key, index) => {
                const field = props.fields[key].id;
                const fieldValue = props.values;
                // console.log(field)
                return (
                    <div className="inline" key={index}>
                        {/*given field name and field values and formatter obj, if formatter defines the format for this field, check if the field has value
                        if the field has value, display the value using the format, otherwise not display anything; if the formatter doesn't define the format
                        for the field, display the value normally if there is a value*/}
                        {formatter[field] ? (fieldValue[field] ? formatter[field] : "") : (fieldValue[field] ?? "")}
                    </div>
                )
            })}
        </React.Fragment>
    )
}