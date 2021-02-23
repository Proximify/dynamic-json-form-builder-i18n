import React from "react";
import {any, FieldValueMapper, FormatterTracker ,reftableFormatter} from "../../../utils/helper";

export default function ResearchDisciplines(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue,true);
    const {
        research_discipline: rd
    } = ft.getFields();
    console.log(ft.getFields())
    return (
        <div>
            {any(rd) &&
            <p>{reftableFormatter(rd.val)}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}