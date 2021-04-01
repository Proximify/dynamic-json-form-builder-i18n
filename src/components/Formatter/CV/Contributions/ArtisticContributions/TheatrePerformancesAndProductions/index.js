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

export default function TheatrePerformancesAndProductions(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            title_of_work:tow,
            producer:pr,
            venue:ve,
            first_performance_date:fpd,
            description_contribution_value: dcv,
            url: u,
            contribution_role: cr,
            number_of_contributors: noc,
            contributors:co,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(tow,pr,ve,fpd) && <p>
                    {singleLineMultiFieldValueFormatter([tow,pr,ve,fpd], null, ['s'], [', ', ', ', ' ',['(',')']])}
                </p>}
                {any(u) && <p>
                    {<StyledLink href={u}>{u.val}</StyledLink>}
                </p>}
                {any(cr) && <p><strong>{cr.val}</strong></p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
                {any(co) && <p>{co.lbl}: {co.val}</p>}
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