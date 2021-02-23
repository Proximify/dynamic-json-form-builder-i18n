import React from "react";
import {any, FieldValueMapper, FormatterTracker, reftableFormatter} from "../../../utils/helper";

export default function FieldsOfApplication(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue, true);
    const {
        field_of_application: foa
    } = ft.getFields();
    console.log(ft.getFields())
    return (
        <div>
            {any(foa) &&
            <p>{reftableFormatter(foa.val)}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}