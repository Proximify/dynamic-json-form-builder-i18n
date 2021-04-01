import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../utils/helper";
import {StyledBilingualItemContainer} from "../../../utils/styledComponents";
import {GenericSubsectionFormatter} from "../../../utils/GenericFormFormatter";

export default function CommitteeMemberships(props) {
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
                    {desc.val.eng && <StyledBilingualItemContainer>
                        <p>{desc.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: desc.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {desc.val.fre && <StyledBilingualItemContainer>
                        <p>{desc.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: desc.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            GenericSubsectionFormatter(props)
        )
    }
}