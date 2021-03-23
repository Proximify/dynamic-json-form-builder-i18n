import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function SupervisedStudentPublications(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            student: stu,
            publication_title: pt,
            published_in: pi,
            edition: ed,
            volume: vo,
            page_range: pr,
            publishing_status: ps,
            date: da,
            publisher: pub,
            publication_location: pl,
            'student_contribution_(%)': sc,
            url: u,
            doi: d,
            contribution_percentage: cp,
            description_contribution_value: dcv,
            description_of_contribution_role: docr,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(stu, pt, pi, ed, vo, pr, ps, da) && <p>
                    {singleLineMultiFieldValueFormatter([stu, pt, pi, ed, vo, pr, ps, da], [false, false, false, true, true, true], ['', 's', '', '', '', '', 's'], [', ', ', ', ', ', ', ', ', ', ', ', ' ', ['(', ') ']])}
                </p>}
                {any(pub, pl) && <p>
                    {singleLineMultiFieldValueFormatter([pub, pl], [true], ['i'], [' '])}
                </p>}
                {any(sc) && <p>{sc.lbl}: {sc.val}</p>}
                {any(u, cp) && <p>
                    {u.val && <span><a href={u}
                                       className="text-blue-500 hover:underline">{u.val}</a>{any(d, cp) && ', '}</span>}
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