import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../utils/helper";
import {StyledBilingualItemContainer, StyledSubsectionFormatterContainer} from "../../../utils/styledComponents";

export default function Workload(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            reporting_start_date: rsd,
            reporting_end_date: red,
            undergraduate_teaching: ut,
            graduate_professional_teaching: gpt,
            external_teaching: et,
            internal_activities: ia,
            academic_administration: aa,
            external_activities: ea,
            total_workload: tw,
            additional_comments: ac
        } = ft.getFields();
        return (
            <div>
                {any(rsd, red) &&
                <p>
                    <span>{rsd.val} - {red.val}</span>
                </p>}
                {any(ut) && <p>{ut.lbl}: {ut.val}</p>}
                {any(gpt) && <p>{gpt.lbl}: {gpt.val}</p>}
                <StyledSubsectionFormatterContainer>
                    {any(et) && <div><p>{et.lbl}</p>
                        {et.val.map((val, index) => {
                            return <div key={index}>
                                <p>{singleLineMultiFieldValueFormatter([val.institution_or_faculty, val.external_workload], null, null, [' '])}</p>
                            </div>
                        })}</div>}
                </StyledSubsectionFormatterContainer>
                {any(ia) && <p>{ia.lbl}: {ia.val}</p>}
                {any(aa) && <p>{aa.lbl}: {aa.val}</p>}
                {any(ea) && <p>{ea.lbl}: {ea.val}</p>}
                {any(tw) && <p>{tw.lbl}: {tw.val}</p>}
                {any(ac) && <>
                    {ac.val.eng && <StyledBilingualItemContainer>
                        <p>{ac.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ac.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {ac.val.fre && <StyledBilingualItemContainer>
                        <p>{ac.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ac.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            institution_or_faculty: iof,
            external_workload: ew
        } = ft.getFields();
        if (subsection) {
            let formattedValue;
            switch (subsection) {
                case 'external_teaching':
                    formattedValue =
                        <p>{singleLineMultiFieldValueFormatter([iof, ew], null, null, [' '])}</p>;
                    break;
                default:
                    formattedValue = genericFieldFormatter(ft.getUnformattedField(), true);
                    break;
            }
            return formattedValue
        } else {
            return (
                <React.Fragment>
                    {JSON.stringify(props.rawData)}
                </React.Fragment>
            )
        }
    }
}