import React from "react";
import {any, FieldValueMapper, FormatterTracker} from "../../../utils/helper";

export default function GeographicalRegions(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue, true);
    const {
        geographical_region: gr
    } = ft.getFields();
    console.log(ft.getFields())
    return (
        <div>
            {any(gr) &&
            <p>{gr.val}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}