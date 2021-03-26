import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, unformattedFieldFormatter
} from "../../../utils/helper";

export default function KnowledgeAndTechnologyTranslation(props) {
    // console.log("Recognitions", props);
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
            activity_description: ad,

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
                    {od.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{od.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: od.val.eng}}/>
                    </div>}
                    {od.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{od.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: od.val.fre}}/>
                    </div>}
                </>}
                {any(eoui) && <>
                    {eoui.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{eoui.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: eoui.val.eng}}/>
                    </div>}
                    {eoui.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{eoui.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: eoui.val.fre}}/>
                    </div>}
                </>}
                {any(ad) && <>
                    {ad.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ad.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.eng}}/>
                    </div>}
                    {ad.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ad.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.fre}}/>
                    </div>}
                </>}
                {unformattedFieldFormatter(ft.getUnformattedField())}
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