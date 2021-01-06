import React from "react";
import CVFormatters from './CV';
import RMFormatters from "./RM";

/**
 * Entry file for formatter
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Formatters(props) {
    console.log("Formatters", props)
    const apps = {
        "CV": <CVFormatters form={props.form} section={props.section} fields={props.fields} values={props.values}/>,
        "RM": <RMFormatters/>
    }

    return (
        <React.Fragment>
            {apps[props.app]}
        </React.Fragment>
    )
}