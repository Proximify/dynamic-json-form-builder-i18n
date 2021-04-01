import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {StyledBilingualItemContainer, StyledSubsectionFormatterContainer} from "../../../../utils/styledComponents";

export default function ProgramDevelopment(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            program_title: pt,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            program_description: pd,
            department: dp,
            unique_innovative_characteristics: uic,
            course_level: cl,
            'co-developers': cd,
            date_first_taught: dft,
        } = ft.getFields();

        return (
            <div>
                {any(ro) && <p><strong>{ro.val}</strong></p>}
                {any(pt) && <p><strong>{pt.val}</strong></p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {singleLineMultiFieldValueFormatter([otori, otorit, otoril], null, null, [', ', ', '])}
                </p>}
                {any(pd) && <>
                    {pd.val.eng && <StyledBilingualItemContainer>
                        <p>{pd.lbl}</p>
                        <p>{pd.val.eng}</p>
                    </StyledBilingualItemContainer>}
                    {pd.val.fre && <StyledBilingualItemContainer>
                        <p>{pd.lbl} (French)</p>
                        <p>{pd.val.fre}</p>
                    </StyledBilingualItemContainer>}
                </>}
                {any(dp) && <p>{dp.val}</p>}
                {any(uic) && <>
                    {uic.val.eng && <StyledBilingualItemContainer>
                        <p>{uic.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: uic.val.eng}}/>
                    </StyledBilingualItemContainer>}
                    {uic.val.fre && <StyledBilingualItemContainer>
                        <p>{uic.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: uic.val.fre}}/>
                    </StyledBilingualItemContainer>}
                </>}
                <StyledSubsectionFormatterContainer>
                    {any(cl) && <div><p>{cl.lbl}: </p><p>{cl.val}</p></div>}
                    {any(cd) &&
                    <div><p>{cd.lbl}: </p> <p>{cd.val.map((val, index) => {
                        return <span key={index}>
                                {singleLineMultiFieldValueFormatter([val.first_name, val.family_name], null, null, [' '])}
                            </span>
                    })}</p></div>}
                    {any(dft) && <div><p>{dft.lbl}: </p><p>{dft.val}</p></div>}
                </StyledSubsectionFormatterContainer>
                {genericFieldFormatter(ft.getUnformattedField())}

            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            first_name: fin,
            family_name: fan
        } = ft.getFields();
        if (subsection) {
            let formattedValue = null;
            switch (subsection) {
                case 'co-developers':
                    formattedValue =
                        <p>{singleLineMultiFieldValueFormatter([fin, fan], null, null, [' '])}</p>;
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