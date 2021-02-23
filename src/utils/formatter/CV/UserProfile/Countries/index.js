import React from "react";
import {any, FieldValueMapper, FormatterTracker} from "../../../utils/helper";

export default function Countries(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue, true);
    const {
        country: co
    } = ft.getFields();
    console.log(ft.getFields())
    return (
        <div>
            {any(co) &&
            <p>{co.val}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}