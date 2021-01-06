import React from "react";

export default function Address(props) {
    console.log("address", props)
    const formatter = {
        "street-number": <em>{props.values["street-number"]} </em>,
        "street-name": <span><i>{props.values["street-name"]} </i></span>,
        "country": <span><mark>{props.values["country"]}</mark></span>
    }
    return (
        <React.Fragment>
            <div className="inline">
                {(props.values && Object.keys(props.values).length > 0) ? <strong>Address: </strong>: ""}
            </div>
            {props.fields.map((element, index) => {
                const fieldName = element.name;
                const fieldValue = props.values;
                return (
                    <div className="inline" key={index}>
                        {/*given field name and field values and formatter obj, if formatter defines the format for this field, check if the field has value
                        if the field has value, display the value using the format, otherwise not display anything; if the formatter doesn't define the format
                        for the field, display the value normally if there is a value*/}
                        {formatter[fieldName] ? (fieldValue[fieldName] ? formatter[fieldName] : "") : (fieldValue[fieldName] ?? "")}
                    </div>
                )
            })}
        </React.Fragment>
    )
}