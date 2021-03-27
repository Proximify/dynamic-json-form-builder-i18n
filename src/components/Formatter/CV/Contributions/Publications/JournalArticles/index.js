import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";

export default function JournalArticles(props) {
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
            article_title: at,
            journal: jo,
            volume: vo,
            issue: is,
            page_range: pr,
            publisher: pub,
            publication_location: pl,
            date: da,
            url: u,
            open_access: oa,
            doi: d,
            contribution_percentage: cp,
            synthesis: sy,
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
                {any(au, at, jo, vo, is, pr, pub, pl, da) && <p>
                    {singleLineMultiFieldValueFormatter([au, at, jo, vo, is, pr, pub, pl, da], [false, false, false, true, true], ['', 's', 'i'], [', ', ', ', ', ', ', ', ', ', '', ', ', ', '], [[5, 6, 8, ' ('], [8, 6, 8, ')']])}
                </p>}
                {any(u, oa, d, cp) && <p>
                    {u.val && <span><a href={u} className="text-blue-500 hover:underline">{u.val} </a></span>}
                    {oa.val && <span>{oa.val}{d.val || cp.val ? ', ' : ''}</span>}
                    {d.val &&
                    <span><a href={d} className="text-blue-500 hover:underline">{d.val}{cp.val ? ', ' : ''}</a></span>}
                    {cp.val && <span>{cp.val}</span>}
                </p>}
                {any(sy) && <p>{sy.val}</p>}
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