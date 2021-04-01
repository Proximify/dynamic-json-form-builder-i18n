import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {StyledBilingualItemContainer} from "../../../../utils/styledComponents";
import {GenericFormFormatter, GenericSubsectionFormatter} from "../../../../utils/GenericFormFormatter";

export default function ExpertWitnessActivities(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;


    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            case: ca,
            location: lo,
            city: ci,
            start_date: sd,
            end_date: ed,
            activity_description: ad
        } = ft.getFields();

        return (
            <div>
                {any(ro, ca, lo, ci) && <p>
                    {singleLineMultiFieldValueFormatter([ro, ca, lo, ci], null, ['s'], [', ', ', ', ', '])}
                </p>}
                {any(sd, ed) && <p>
                    <span>({sd.val} - {ed.val})</span>
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