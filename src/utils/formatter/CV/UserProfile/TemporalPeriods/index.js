import React from "react";
import {any, FieldValueMapper, FormatterTracker, reftableValueParser} from "../../../utils/helper";

export default function TemporalPeriods(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue, true);
    const {
        from_year: fy,
        from_year_period: fyp,
        to_year: ty,
        to_year_period: typ
    } = ft.getFields();
    return (
        <div>
            {any(fy, ty, fyp, typ) && <p><span>{fy.val} {fyp.val && `(${fyp.val})`} - {ty.val} {typ.val && `(${typ.val})`}</span></p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}