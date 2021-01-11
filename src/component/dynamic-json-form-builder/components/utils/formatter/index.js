import React from "react";
import CVFormatter from './CV';
import RMFormatter from "./RM";

/**
 * Entry file for formatter
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
// TODO: remove s of TAGS
export default function Formatter(props) {
    // console.log("Formatter", props)
    const apps = {
        "CV": <CVFormatter form={props.form} section={props.section} fields={props.fields} values={props.values}/>,
        "RM": <RMFormatter/>
    }

    return (
        <React.Fragment>
            {apps[props.app]}
        </React.Fragment>
    )
}