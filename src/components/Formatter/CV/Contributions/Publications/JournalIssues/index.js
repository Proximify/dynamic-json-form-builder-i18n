import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {
    StyledBilingualItemContainer,
    StyledLink,
    StyledSubsectionFormatterContainer
} from "../../../../utils/styledComponents";

export default function JournalIssues(props) {
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
            issue_title: it,
            journal: jo,
            volume: vo,
            issue: is,
            number_of_pages: nop,
            publisher: pub,
            publication_location: pl,
            date: da,
            url: u,
            open_access: oa,
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
                {any(au, it, jo, vo, is, nop, pub, pl) && <p>
                    {singleLineMultiFieldValueFormatter([au, it, jo, vo, is, nop, pub, pl], [false, false, false, true, true, true], ['', 's', 'i'], [', ', ', ', ', ', ', ', ', ', ', ', ', '])}
                </p>}
                {any(da, u, oa, d, cp) && <p>
                    {da.val && <span>{da.val}{any(u, oa, d, cp) && ', '}</span>}
                    {u.val && <span><StyledLink href={u}>{u.val}</StyledLink>{any(oa, d, cp) && ', '}</span>}
                    {oa.val && <span>{oa.val}{any(d, cp) && ', '}</span>}
                    {d.val &&
                    <span><StyledLink href={d}>{d.val}</StyledLink>{cp.val ? ', ' : ''}</span>}
                    {cp.val && <span>{cp.val}</span>}
                </p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
                {any(ed) && <p><strong>{ed.lbl}</strong>: {ed.val}</p>}
                {any(dcv) && <>
                    {dcv.val.eng && <StyledBilingualItemContainer>
                        <p>{dcv.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {dcv.val.fre && <StyledBilingualItemContainer>
                        <p>{dcv.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {any(docr) && <>
                    {docr.val.eng && <StyledBilingualItemContainer>
                        <p>{docr.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: docr.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {docr.val.fre && <StyledBilingualItemContainer>
                        <p>{docr.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: docr.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                <StyledSubsectionFormatterContainer>
                    {any(fs) &&
                    <div><p>{fs.lbl}</p>
                        {fs.val.map((val, index) => {
                            return <p key={index}>
                                {singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization, val.funding_reference_number], [false, false, true], null, null, [[1, 2, 2, ' ('], [2, 2, 2, ')']])}
                            </p>
                        })}
                    </div>}
                </StyledSubsectionFormatterContainer>
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