import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function CommitteeMemberships(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;


    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            geographical_scope: gs,
            membership_start_date: msd,
            membership_end_date: med,
            committee_name: cn,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            description: desc,
            faculty: fa,
            department_division: dd
        } = ft.getFields();

        console.log(ft.getFields())
        return (
            <div>
                {any(ro, gs, msd, med) && <p>
                    {singleLineMultiFieldValueFormatter([ro, gs, msd, med], [false, true], ['s'], [', '], [[1, 2, 3, ' ('], [2, 2, 3, ' - '], [3, 2, 3, ')']])}
                </p>}
                {any(fa) && <p>{fa.lbl}: {fa.val}</p>}
                {any(cn) && <p>{cn.val}</p>}

                {any(dd) &&
                <p>{reftableValueParser(dd.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}</p>}

                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {singleLineMultiFieldValueFormatter([otori, otorit, otoril], null, null, [', ', ', '])}
                </p>}
                {any(desc) && <>
                    {desc.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{desc.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: desc.val.eng}}/>
                    </div>}
                    {desc.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{desc.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: desc.val.fre}}/>
                    </div>}
                </>}
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                EventAdministration
            </React.Fragment>
        )
    }
}