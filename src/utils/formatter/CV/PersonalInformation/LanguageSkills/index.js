import React from "react";
import {stringify} from "postcss";
import {FieldValueMapper, FormatterTracker, any} from "../../../utils/helper";

export default function LanguageSkills(props) {
    // console.log("LanguageSkill", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        // console.log(mappedValue)
        // const ft = new FormatterTracker(mappedValue);
        // const it = ft.getFields();
        // const val = ft.getValue();
        // const lbl = ft.getLabel();
        return (
            // <div className="border border-red-300 m-2 rounded">
            //     {any(it.language) ?
            //         <p>{lbl.language}{val.language}</p> : null}
            //     {any(it.speak) ?
            //         <p>{lbl.speak}{val.speak}</p> : null}
            //     {any(it.write) ? <p>{lbl.write}: {val.write}</p> : null}
            //     {Object.keys(ft.getUnFormattedField()).length > 0 ?
            //         <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            //     }
            // </div>
            null
        )
    } else {
        return (
            <React.Fragment>
                LanguageSkill
            </React.Fragment>
        )
    }
}