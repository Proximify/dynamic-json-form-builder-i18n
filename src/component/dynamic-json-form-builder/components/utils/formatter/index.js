import React from "react";
import CVFormatter from './CV';
import RMFormatter from "./RM";

/**
 * Entry file for formatter
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Formatter(props) {
    console.log("Formatter", props)
    const apps = {
        "CV": <CVFormatter section={props.section} form={props.form} rawData={props.rawData} isFullScreenViewMode={props.isFullScreenViewMode} fields={props.fields} values={props.values} />,
        "RM": <RMFormatter/>
    }

    return (
        <React.Fragment>
            {apps[props.app]}
        </React.Fragment>
    )
}