import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function JournalReviewActivities(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            review_type: rt,
            journal: jn,
            press: pr,
            number_of_works_reviewed_refereed: nowrr,
            start_date: sd,
            end_date: ed
        } = ft.getFields();

        return (
            <div>
                {any(ro, rt, jn) && <p>
                    {singleLineMultiFieldValueFormatter([ro, rt, jn], null, ['s', '', 's'], [', ', ', '])}
                </p>}
                {any(pr) && <p>{pr.val}</p>}
                {any(nowrr) && <p>{nowrr.lbl}: {nowrr.val}</p>}
                {any(sd, ed) && <p>
                    <span>({sd.val} - {ed.val})</span>
                </p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                JournalReviewActivities
            </React.Fragment>
        )
    }
}