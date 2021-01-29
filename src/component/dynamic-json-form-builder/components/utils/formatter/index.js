import React from "react";
import CVFormatter from './CV';
import RMFormatter from "./RM";

/**
 * Entry file for formatter
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
// app, section key, subsection key => full screen
// app section name, sub section name => per form
export default function Formatter(props) {
    // console.log("Formatter", props)
    const apps = {
        "CV": <CVFormatter structureChain={props.structureChain} isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema} rawData={props.rawData}/>,
        "RM": <RMFormatter/>
    }

    return (
        <React.Fragment>
            {props.app in apps ? apps[props.app] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}