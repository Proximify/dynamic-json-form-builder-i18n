import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function Books(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            refereed: ref,
            publishing_status: ps,
            contribution_role: cr,
            authors: au,
            book_title: bt,
            edition: edi,
            volume: vo,
            number_of_pages: nop,
            publisher: pub,
            publication_location: pl,
            publication_city: pc,
            date: da,
            url: u,
            doi: d,
            contribution_percentage: cp,
            number_of_contributors: noc,
            editors: ed,
            description_contribution_value: dcv,
            description_of_contribution_role: docr,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(ref, ps, cr) && <p>
                    {singleLineMultiFieldValueFormatter([ref, ps, cr], null, ['s', '', 's'], [', ', ', '])}
                </p>}
                {any(au, bt, edi, vo, nop, pub, pl) && <p>
                    {singleLineMultiFieldValueFormatter([au, bt, edi, vo, nop, pub, pl], [false, false, true, true, true], ['', 's', '', '', '', 'i'], [', ', ', ', ', ', ', ', ', ', ', '])}
                </p>}
                {any(pc, da, u, d, cp) && <p>
                    {singleLineMultiFieldValueFormatter([pc, da], null, null, [', '])}
                    {any(u, d, cp) && <span>, </span>}
                    {u.val && <span><a href={u}
                                       className="text-blue-500 hover:underline">{u.val}</a>{any(d, cp) && ', '}</span>}
                    {d.val &&
                    <span><a href={d} className="text-blue-500 hover:underline">{d.val}</a>{cp.val ? ', ' : ''}</span>}
                    {cp.val && <span>{cp.val}</span>}
                </p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
                {any(ed) && <p><strong>{ed.lbl}</strong>: {ed.val}</p>}
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