import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {StyledBilingualItemContainer} from "../../../../utils/styledComponents";
import {GenericSubsectionFormatter} from "../../../../utils/GenericFormFormatter";

export default function OrganizationalReviewActivities(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            activity_description: ad,
            start_date: sd,
            end_date: ed
        } = ft.getFields();

        return (
            <div>
                {any(ro, sd, ed) && <p>
                    {singleLineMultiFieldValueFormatter([ro, sd, ed], null, ['s'], null, [[0, 1, 2, ' ('], [1, 1, 2, ' - '], [2, 1, 2, ')']])}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {singleLineMultiFieldValueFormatter([otori, otorit, otoril], null, null, [', ', ', '])}
                </p>}
                {any(ad) && <>
                    {ad.val.eng && <StyledBilingualItemContainer>
                        <p>{ad.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {ad.val.fre && <StyledBilingualItemContainer>
                        <p>{ad.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.fre}}/>
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