import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    any,
    singleLineMultiFieldValueFormatter,
    genericFieldFormatter
} from "../../../utils/helper";
import {GenericSubsectionFormatter} from "../../../utils/GenericFormFormatter";

export default function LanguageSkills(props) {
    const {rawData, schema} = props;
    const formData = rawData.values;

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
                    <strong>{la.val} </strong>
                    {any(rd, wr, sp, und, pv) &&
                    <span>({singleLineMultiFieldValueFormatter([rd, wr, sp, und, pv], null, null, [', ', ', ', ', ', ', '])})</span>}
                </p>}
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            GenericSubsectionFormatter(props)
        )
    }
}