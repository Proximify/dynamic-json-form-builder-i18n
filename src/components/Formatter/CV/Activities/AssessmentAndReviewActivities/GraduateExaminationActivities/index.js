import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function GraduateExaminationActivities(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            graduate_examination_activity_role: gear,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            department: dp,
            start_date: sd,
            end_date: ed,
            student_name: sn
        } = ft.getFields();

        return (
            <div>
                {any(gear, sd,ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([gear,sd,ed], null, ['s'], null,[[0,1,2,' ('],[1,1,2,' - '],[2,1,2,')']])}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {singleLineMultiFieldValueFormatter([otori, otorit, otoril], null, null, [', ', ', '])}
                </p>}
                {any(dp) &&<p>{dp.val}</p>}
                {any(sn) && <p>{sn.val}</p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                GraduateExaminationActivities
            </React.Fragment>
        )
    }
}