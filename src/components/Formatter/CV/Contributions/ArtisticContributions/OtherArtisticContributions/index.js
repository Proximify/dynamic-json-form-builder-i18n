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

export default function OtherArtisticContributions(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            title: ti,
            venue: ve,
            date: da,
            number_of_contributors: noc,
            url: u,
            contribution_role: cr,
            description_contribution_value: dcv,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(ti) && <>
                    {ti.val.eng && <StyledBilingualItemContainer>
                        <p>{ti.lbl}</p>
                        <p><strong>{ti.val.eng}</strong></p>
                    </StyledBilingualItemContainer>}
                    {ti.val.fre && <StyledBilingualItemContainer>
                        <p>{ti.lbl} (French)</p>
                        <p><strong>{ti.val.fre}</strong></p>
                    </StyledBilingualItemContainer>}
                </>}
                {any(ve, da) && <p>
                    {singleLineMultiFieldValueFormatter([ve, da], null, null, [', ', ['(', ')']])}
                </p>}
                {any(u) && <p>
                    {<StyledLink href={u}>{u.val}</StyledLink>}
                </p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
                {any(cr) && <>
                    {cr.val.eng && <StyledBilingualItemContainer>
                        <p>{cr.lbl}</p>
                        <p>{cr.val.eng}</p>
                    </StyledBilingualItemContainer>}
                    {cr.val.fre && <StyledBilingualItemContainer>
                        <p>{cr.lbl} (French)</p>
                        <p>{cr.val.fre}</p>
                    </StyledBilingualItemContainer>}
                </>}
                {any(dcv) && <>
                    {dcv.val.eng && <StyledBilingualItemContainer>
                        <p>{dcv.lbl}</p>
                        <p>{dcv.val.eng}</p>
                    </StyledBilingualItemContainer>}
                    {dcv.val.fre && <StyledBilingualItemContainer>
                        <p>{dcv.lbl} (French)</p>
                        <p>{dcv.val.fre}</p>
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