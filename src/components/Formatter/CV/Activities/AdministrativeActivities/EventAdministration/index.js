import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {StyledBilingualItemContainer} from "../../../../utils/styledComponents";
import {GenericSubsectionFormatter} from "../../../../utils/GenericFormFormatter";
import GenericFieldTemplate from "../../../../../FormBuilder/components/utils/GenericFieldTemplate";

export default function EventAdministration(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            event_type: et,
            event_name: en,
            activity_start_date: asd,
            activity_end_date: aed,
            primary_event_organizer: peo,
            activity_description: ad,
            event_start_date: esd,
            event_end_date: eed,
        } = ft.getFields();

        return (
            <div>
                {any(ro, et, en, asd, aed) && <p>
                    {singleLineMultiFieldValueFormatter([ro, et, en, asd, aed], null, ['s'], [', ', ', '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}
                </p>}
                {any(peo) && <p>{peo.val}</p>}
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
                {any(esd, eed) && <p>
                    ({esd.val && <span>{esd.lbl}: {esd.val}</span>}
                    -
                    {eed.val && <span>{eed.lbl}: {eed.val}</span>})
                </p>}
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            GenericSubsectionFormatter(props)
        )
    }
}