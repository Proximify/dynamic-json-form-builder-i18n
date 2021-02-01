import React from "react";

export default function Source(props) {
    console.log("source", props)
    const formatter = {
        "street-number": <em>{props.data["street-number"]} </em>,
        "street-name": <span><i>{props.data["street-name"]} </i></span>,
        "country": <span><mark>{props.data["country"]}</mark></span>
    }
    return (
        <React.Fragment>
            This is the source formatter belongs to All Reference Form
            {/*<div className="inline">*/}
            {/*    {(props.data && Object.keys(props.data).length > 0) ? <strong>Address: </strong>: ""}*/}
            {/*</div>*/}
            {/*{props.fields.map((element, index) => {*/}
            {/*    const fieldName = element.name;*/}
            {/*    const fieldData = props.data;*/}
            {/*    return (*/}
            {/*        <div className="inline" key={index}>*/}
            {/*            /!*given field name and field values and formatter obj, if formatter defines the format for this field, check if the field has value*/}
            {/*            if the field has value, display the value using the format, otherwise not display anything; if the formatter doesn't define the format*/}
            {/*            for the field, display the value normally if there is a value*!/*/}
            {/*            {formatter[fieldName] ? (fieldData[fieldName] ? formatter[fieldName] : "") : (fieldData[fieldName] ?? "")}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </React.Fragment>
    )
}