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

export default function OtherMemberships(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            membership_start_date:msd,
            membership_end_date:med,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            description: desc
        } = ft.getFields();

        return (
            <div>
                {any(ro, msd, med) && <p>
                    {singleLineMultiFieldValueFormatter([ro, msd, med], null, ['s'], null, [[0, 1, 2, ' ('], [1, 1, 2, ' - '], [2, 1, 2, ')']])}
                </p>}
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