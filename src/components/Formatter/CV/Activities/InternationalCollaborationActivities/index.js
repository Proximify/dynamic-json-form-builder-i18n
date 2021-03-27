import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../utils/helper";

export default function InternationalCollaborationActivities(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;


    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            location: lo,
            start_date: sd,
            end_date: ed,
            activity_description: ad
        } = ft.getFields();

        return (
            <div>
                {any(ro, lo, sd, ed) && <p>
                    {singleLineMultiFieldValueFormatter([ro, lo, sd, ed], null, ['s'], [', '], [[1, 2, 3, ' ('], [2, 2, 3, ' - '], [3, 2, 3, ')']])}
                </p>}
                {any(ad) && <>
                    {ad.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ad.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.eng}}/>
                    </div>}
                    {ad.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ad.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.fre}}/>
                    </div>}
                </>}
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            <React.Fragment>
                InternationalCollaborationActivities
            </React.Fragment>
        )
    }
}