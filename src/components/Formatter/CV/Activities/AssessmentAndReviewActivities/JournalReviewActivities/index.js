import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {GenericSubsectionFormatter} from "../../../../utils/GenericFormFormatter";

export default function JournalReviewActivities(props) {
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
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            GenericSubsectionFormatter(props)
        )
    }
}