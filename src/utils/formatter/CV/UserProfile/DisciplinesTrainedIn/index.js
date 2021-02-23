import React from "react";
import {any, FieldValueMapper, FormatterTracker, reftableFormatter} from "../../../utils/helper";

export default function DisciplinesTrainedIn(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue, true);
    const {
        discipline_trained_in: dt
    } = ft.getFields();
    console.log(ft.getFields())
    return (
        <div>
            {any(dt) &&
            <p>{reftableFormatter(dt.val)}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}