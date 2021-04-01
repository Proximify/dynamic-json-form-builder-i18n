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

export default function InternationalCollaborationActivities(props) {
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