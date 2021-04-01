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

export default function MentoringActivities(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            start_date: sd,
            end_date: ed,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            mentorees: me,
            number_of_mentorees: nome,
            activity_description: ad
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
                {any(me, nome) && <p>
                    {singleLineMultiFieldValueFormatter([me, nome], [true, true], ['s'], ['', ')'], [[0,1,1, ' (']])}
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