import React from "react";
import {any, FieldValueMapper, FormatterTracker} from "../../../utils/helper";

export default function AreaOfResearch(props) {
    const {rawData, schema} = props;
    const mappedValue = FieldValueMapper(rawData, schema, true);
    const ft = new FormatterTracker(mappedValue);
    const {
        area_of_research: aor
    } = ft.getFields();
    return (
        <div>
            {any(aor) &&
            <p>{aor.lbl}: {aor.val}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
        </div>
    )
}