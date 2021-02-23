import React from "react";
import {any, FieldValueMapper, FormatterTracker} from "../../../utils/helper";

export default function ResearchDisciplines(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue);
    const {
        research_discipline: rd
    } = ft.getFields();
    return (
        <div>
            {any(rd) &&
            <p>{rd.lbl}: {rd.val}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}