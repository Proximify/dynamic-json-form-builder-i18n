import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function Presentations(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            presentation_title: pt,
            presentation_date: pd,
            conference_event_name: cen,
            location: lo,
            city: ci,
            main_audience: ma,
            invited: inv,
            keynote: ke,
            competitive: co,
            description_contribution_value: dcv,
            url: u,
            'co-presenters': cp,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(pt, pd) && <p>
                    {singleLineMultiFieldValueFormatter([pt, pd], null, ['s'], ['', [' (',')']])}
                </p>}
                {any(cen) && <p>{cen.val}</p>}
                {any(lo, ci) && <p>
                    {singleLineMultiFieldValueFormatter([lo,ci], null, null, [' '])}
                </p>}
                {any(ma) && <p>{ma.lbl}: {ma.val}</p>}
                {any(inv, ke, co) && <p>
                    {singleLineMultiFieldValueFormatter([inv, ke, co], null, null, [', ', ', '])}
                </p>}
                {any(dcv) && <>
                    {dcv.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{dcv.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.eng}}/>
                    </div>}
                    {dcv.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{dcv.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.fre}}/>
                    </div>}
                </>}
                {any(u) && <p>
                    <a href={u} className="text-blue-500 hover:underline"> {u.val}</a>
                </p>}
                <div className="viewModeSubsection">
                    {any(cp) && <div><p>{cp.lbl}: </p><p>{cp.val}</p></div>}
                    {any(fs) &&
                    <div><p>{fs.lbl}</p>
                        {fs.val.map((val, index) => {
                            return <p key={index}>
                                {singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization, val.funding_reference_number], [false, false, true], null, null, [[1, 2, 2, ' ('], [2, 2, 2, ')']])}
                            </p>
                        })}
                    </div>}
                </div>
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            funding_organization: fori,
            other_funding_organization: ofori,
            funding_reference_number: frn
        } = ft.getFields();

        if (subsection) {
            let formattedValue = null;
            switch (subsection) {
                case 'funding_sources':
                    formattedValue = <p>
                        {singleLineMultiFieldValueFormatter([fori, ofori, frn], [false, false, true], null, null, [[1, 2, 2, ' ('], [2, 2, 2, ')']])}
                    </p>
                    break;
                default:
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