import React from "react";
import Presentations from "./Presentations";
import InterviewsAndMediaRelations from "./InterviewsAndMediaRelations";
import Publications from "./Publications";
import ArtisticContributions from "./ArtisticContributions";
import IntellectualProperty from "./IntellectualProperty";
import {GenericFormFormatter} from "../../utils/GenericFormFormatter";

export default function Contributions(props) {
    const subsections = {
        "presentations": <Presentations structureChain={props.structureChain}
                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                   rawData={props.rawData}/>,
        "interviews_and_media_relations": <InterviewsAndMediaRelations structureChain={props.structureChain}
                                                         isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                         rawData={props.rawData}/>,
        "publications": <Publications structureChain={props.structureChain}
                                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                               rawData={props.rawData}/>,
        "artistic_performances": <ArtisticContributions structureChain={props.structureChain}
                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                      rawData={props.rawData}/>,
        "intellectual_property": <IntellectualProperty structureChain={props.structureChain}
                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                   rawData={props.rawData}/>
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : GenericFormFormatter(props)}
        </React.Fragment>
    )
}