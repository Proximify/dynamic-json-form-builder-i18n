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
                {any(ro, rt, jn,sd, ed) && <p>
                    {singleLineMultiFieldValueFormatter([ro, rt, jn,sd, ed], null, ['s', '', 's'], [', ', ', '], [[2,3,4,' ('],[3,3,4,' - '],[4,3,4,')']])}
                </p>}
                {any(pr) && <p>{pr.val}</p>}
                {any(nowrr) && <p>{nowrr.lbl}: {nowrr.val}</p>}
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