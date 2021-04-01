import React from "react";
import CVFormatter from './CV';
/**
 * Entry file for formatter
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export default function Formatter(props) {
    const apps = {
        "CV": <CVFormatter structureChain={props.structureChain} isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema} rawData={props.rawData}/>,
    }

    return (
        <React.Fragment>
            {props.app in apps ? apps[props.app] : JSON.stringify(props.rawData)}
        </React.Fragment>
    )
}