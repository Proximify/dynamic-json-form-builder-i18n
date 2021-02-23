import React from "react";
import {any, FieldValueMapper, FormatterTracker, reftableFormatter} from "../../../utils/helper";

export default function ResearchCentres(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue, true);
    const {
        research_centre: rc
    } = ft.getFields();
    console.log(ft.getFields())
    return (
        <div>
            {any(rc) &&
            <p>{reftableFormatter(rc.val)}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}