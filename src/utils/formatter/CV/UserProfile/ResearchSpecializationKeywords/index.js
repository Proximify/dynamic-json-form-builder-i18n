import React from "react";
import {any, FieldValueMapper, FormatterTracker, reftableFormatter} from "../../../utils/helper";

export default function ResearchSpecializationKeywords(props) {
    console.log("ResearchSpecializationKeywords", props)
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    console.log(mappedValue)
    const ft = new FormatterTracker(mappedValue, true);
    const {
        research_specialization_keywords: rsk
    } = ft.getFields();
    console.log(ft.getFields())
    return (
        <div>
            {any(rsk) && <p><span>{rsk.val.eng} {rsk.val.fre ? `(${rsk.val.fre})` : null}</span></p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}