import React from "react";
import {any, FieldValueMapper, FormatterTracker, reftableFormatter} from "../../../utils/helper";

export default function TechnologicalApplications(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue, true);
    const {
        technological_application: ta
    } = ft.getFields();
    return (
        <div>
            {any(ta) &&
            <p>{reftableFormatter(ta.val)}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}