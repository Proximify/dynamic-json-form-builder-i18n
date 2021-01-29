import React from "react";
import {stringify} from "postcss";
import {FieldValueMapper, FormatterTracker} from "../../../utils/helper";

export default function LanguageSkills(props) {
    // console.log("LanguageSkill", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        // console.log(mappedValue)
        const ft = new FormatterTracker(mappedValue);
        return (
            <div className="border border-red-300 m-2 rounded">
                {ft.contains("language") ?
                    <p>{ft.getLabel("language")}{ft.getValue("language")}</p> : null}
                {ft.contains("speak") ?
                    <p>{ft.getLabel("speak")}{ft.getValue("speak")}</p> : null}
                {ft.contains("write") ? <p>{ft.getLabel("write")}: {ft.getValue("write")}</p> : null}
                {Object.keys(ft.getUnFormattedValue()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedValue())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                LanguageSkill
            </React.Fragment>
        )
    }
}