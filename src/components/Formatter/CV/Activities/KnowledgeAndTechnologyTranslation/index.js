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

export default function KnowledgeAndTechnologyTranslation(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            knowledge_and_technology_translation_activity_type: katta,
            group_organization_business_serviced:gobs,
            start_date: sd,
            end_date: ed,
            target_stakeholder:ts,
            references_citations_web_sites:rcws,
            outcome_deliverable:od,
            evidence_of_uptake_impact:eoui,
            activity_description: ad
        } = ft.getFields();

        return (
            <div>
                {any(ro, katta, gobs, sd, ed) && <p>
                    {singleLineMultiFieldValueFormatter([ro, katta, gobs, sd, ed], null, ['s'], [', ', ', '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}
                </p>}
                {any(ts,rcws) && <p>
                    {singleLineMultiFieldValueFormatter([ts,rcws], null, null, [', '])}
                </p>}
                {any(od) && <>
                    {od.val.eng && <StyledBilingualItemContainer>
                        <p>{od.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: od.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {od.val.fre && <StyledBilingualItemContainer>
                        <p>{od.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: od.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {any(eoui) && <>
                    {eoui.val.eng && <StyledBilingualItemContainer>
                        <p>{eoui.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: eoui.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {eoui.val.fre && <StyledBilingualItemContainer>
                        <p>{eoui.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: eoui.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
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