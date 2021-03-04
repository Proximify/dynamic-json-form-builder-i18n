import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function ResearchFundingApplicationAssessmentActivities(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;


    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            funding_reviewer_role: frr,
            reviewer_type: rt,
            committee_name: cn,
            assessment_type:at,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            funding_organization:fori,
            number_of_applications_assessed:noaa,
            start_date: sd,
            end_date: ed,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa
        } = ft.getFields();

        return (
            <div>
                {any(frr, rt, cn) && <p>
                    {singleLineMultiFieldValueFormatter([frr, rt, cn], [false, false, true], null, [', ', ', '])}
                </p>}
                {any(at) && <p>{at.lbl}: {at.val}</p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {singleLineMultiFieldValueFormatter([otori, otorit, otoril], null, null, [', ', ', '])}
                </p>}
                {any(fori) && <p>{fori.lbl}: {fori.val}</p>}
                {any(noaa, sd,ed) && <p>
                    {singleLineMultiFieldValueFormatter([noaa, sd,ed], null, null, null,[[0,1,2,' ('],[1,1,2,' - '],[2,1,2,')']])}
                </p>}
                <div className="viewModeSubsection">
                    {any(rd) && <div><p>{rd.lbl}</p>
                        {reftableValueParser(rd.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}

                    {any(aor) && <div><p>{aor.lbl}</p>
                        {reftableValueParser(aor.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                    {any(foa) && <div><p>{foa.lbl}</p>
                        {reftableValueParser(foa.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                </div>
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
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