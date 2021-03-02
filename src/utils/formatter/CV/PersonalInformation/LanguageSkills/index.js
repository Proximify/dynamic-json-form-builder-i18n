import React from "react";
import {FieldValueMapper, FormatterTracker, any, multiFieldSubsectionFormatter} from "../../../utils/helper";

export default function LanguageSkills(props) {
    // console.log("LanguageSkill", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            language: la,
            read: rd,
            write: wr,
            speak: sp,
            understand: und,
            peer_review: pv
        } = ft.getFields();

        return (
            <div>
                {any(la) &&
                <p>
                    <span className="font-bold">{la.val} </span>
                    {any(rd, wr, sp, und, pv) &&
                    <span>({multiFieldSubsectionFormatter([rd, wr, sp, und, pv], null, null, [', ', ', ', ', ', ', '])})</span>}
                </p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    }
else
    {
        return (
            <React.Fragment>
                LanguageSkill
            </React.Fragment>
        )
    }
}