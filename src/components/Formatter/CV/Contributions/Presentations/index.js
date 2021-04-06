import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../utils/helper";
import {
    StyledBilingualItemContainer,
    StyledLink,
    StyledSubsectionFormatterContainer
} from "../../../utils/styledComponents";

export default function Presentations(props) {
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
                    {dcv.val.eng && <StyledBilingualItemContainer>
                        <p>{dcv.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {dcv.val.fre && <StyledBilingualItemContainer>
                        <p>{dcv.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                {any(u) && <p>
                    <StyledLink href={u}> {u.val}</StyledLink>
                </p>}
                <StyledSubsectionFormatterContainer>
                    {any(cp) && <div><p>{cp.lbl}: </p><p>{cp.val}</p></div>}
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
            let formattedValue;
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