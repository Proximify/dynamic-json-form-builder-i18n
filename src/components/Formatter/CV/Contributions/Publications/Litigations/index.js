import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";

export default function Litigations(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            case_name: cn,
            person_acted_for: paf,
            court: co,
            location: lo,
            start_date:sd,
            end_date:ed,
            key_legal_issues:kle,
            url: u,
            doi: d,
            contribution_percentage: cp,
            description_contribution_value: dcv,
            description_of_contribution_role: docr,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(cn,paf,co,lo,sd,ed) && <p>
                    {singleLineMultiFieldValueFormatter([cn,paf,co,lo,sd,ed], null, ['s'], [', ', ', ',', '], [[3,4,5,' ('], [4,4,5,' - '], [5,4,5,')']])}
                </p>}
                {any(kle) && <>
                    {kle.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{kle.lbl}</p>
                        <p>{kle.val.eng}</p>
                    </div>}
                    {kle.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{kle.lbl} (French)</p>
                        <p>{kle.val.fre}</p>
                    </div>}
                </>}
                {any(u, d, cp) && <p>
                    {u.val && <span><a href={u}
                                       className="text-blue-500 hover:underline">{u.val}</a>{any(d, cp) && ', '}</span>}
                    {d.val &&
                    <span><a href={d} className="text-blue-500 hover:underline">{d.val}</a>{cp.val ? ', ' : ''}</span>}
                    {cp.val && <span>{cp.val}</span>}
                </p>}
                {any(d) && <>
                    {d.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{d.lbl}</p>
                        <p>{d.val.eng}</p>
                    </div>}
                    {d.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{d.lbl} (French)</p>
                        <p>{d.val.fre}</p>
                    </div>}
                </>}
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
                {any(docr) && <>
                    {docr.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{docr.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: docr.val.eng}}/>
                    </div>}
                    {docr.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{docr.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: docr.val.fre}}/>
                    </div>}
                </>}
                {any(fs) &&
                <div><p><strong>{fs.lbl}</strong></p>
                    {fs.val.map((val, index) => {
                        return <p key={index}>
                            {singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization, val.funding_reference_number], [false, false, true], null, null, [[1, 2, 2, ' ('], [2, 2, 2, ')']])}
                        </p>
                    })}
                </div>}
                {genericFieldFormatter(ft.getUnformattedField())}
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