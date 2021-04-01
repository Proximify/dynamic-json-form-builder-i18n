import React from "react";
import Patents from "./Patents";
import License from "./Licenses";
import Disclosures from "./Disclosures";
import RegisteredCopyrights from "./RegisteredCopyrights";
import Trademarks from "./Trademarks";
import {GenericFormFormatter} from "../../../utils/GenericFormFormatter";

export default function IntellectualProperty(props) {

    const subsections = {
        "patents": <Patents structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                     rawData={props.rawData}/>,
        "licenses": <License structureChain={props.structureChain}
                                           isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                           rawData={props.rawData}/>,
        "disclosures": <Disclosures structureChain={props.structureChain}
                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                             rawData={props.rawData}/>,
        "registered_copyrights": <RegisteredCopyrights structureChain={props.structureChain}
                                    isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                    rawData={props.rawData}/>,
        "trademarks": <Trademarks structureChain={props.structureChain}
                                                       isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                       rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : GenericFormFormatter(props)}
        </React.Fragment>
    )
}