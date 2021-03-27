import React from "react";
import Presentations from "./Presentations";
import InterviewsAndMediaRelations from "./InterviewsAndMediaRelations";
import Publications from "./Publications";
import ArtisticContributions from "./ArtisticContributions";
import IntellectualProperty from "./IntellectualProperty";
import {FieldValueMapper, FormatterTracker, genericFieldFormatter} from "../../utils/helper";

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

    const genericFormFormatter = () => {
        const rawData = props.rawData;
        const formData = rawData.values;
        const schema = props.schema;

        if (props.isFullScreenViewMode === true) {
            const mappedValue = FieldValueMapper(formData, schema);
            const ft = new FormatterTracker(mappedValue);
            return (
                <div>
                    {genericFieldFormatter(ft.getUnformattedField())}
                </div>
            )
        } else {
            const mappedValue = FieldValueMapper(rawData, schema, true);
            const ft = new FormatterTracker(mappedValue, true);
            const subsection = props.structureChain[0];

            if (subsection) {
                let formattedValue = null;
                switch (subsection) {
                    default:
                        formattedValue = genericFieldFormatter(ft.getUnformattedField());
                        break;
                }
                return formattedValue
            } else {
                return (
                    <React.Fragment>
                        {JSON.stringify(props.rawData)}
                    </React.Fragment>
                )
            }
        }
    }

    return (
        <React.Fragment>
            {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : genericFormFormatter()}
        </React.Fragment>
    )
}