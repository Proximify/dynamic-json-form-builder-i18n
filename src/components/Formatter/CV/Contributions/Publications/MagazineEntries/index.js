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

export default function MagazineEntries(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            article_title: at,
            magazine_name: mn,
            volume: vo,
            issue: is,
            page_range: pr,
            publishing_status: ps,
            date: da,
            publisher: pub,
            publication_location: pl,
            url: u,
            doi: d,
            contribution_percentage: cp,
            contribution_role: cr,
            number_of_contributors: noc,
            authors: au,
            editors: ed,
            description_contribution_value: dcv,
            description_of_contribution_role: docr,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(at, mn, vo, is, pr, ps, da) && <p>
                    {singleLineMultiFieldValueFormatter([at, mn, vo, is, pr, ps, da], [false, false, true, true, true], ['s', '', '', '', '', 's'], [', ', ', ', ', ', ', ', ', ', ' ', ['(', ')']])}
                </p>}
                {any(pub, pl) && <p>
                    {singleLineMultiFieldValueFormatter([pub, pl], null, ['i'], [', '])}
                </p>}
                {any(u, d, cp) && <p>
                    {u.val && <span><StyledLink href={u}>{u.val}</StyledLink>{any(d, cp) && ', '}</span>}
                    {d.val &&
                    <span><StyledLink href={d}>{d.val}</StyledLink>{cp.val ? ', ' : ''}</span>}
                    {cp.val && <span>{cp.val}</span>}
                </p>}
                {any(cr) && <p><strong>{cr.val}</strong></p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
                {any(au) && <p><strong>{au.lbl}</strong>: {au.val}</p>}
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