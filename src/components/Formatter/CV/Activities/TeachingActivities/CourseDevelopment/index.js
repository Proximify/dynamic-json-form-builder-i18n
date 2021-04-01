import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";
import {StyledBilingualItemContainer} from "../../../../utils/styledComponents";

export default function CourseDevelopment(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            department: dp,
            course_title: cti,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            course_level: cl,
            'co-developers': cd,
            date_first_taught: dft,
            course_description: cdesc,
        } = ft.getFields();

        return (
            <div>
                {any(ro, dp) &&
                <p>
                    {singleLineMultiFieldValueFormatter([ro, dp], null, ['s'], [', '])}
                </p>}
                {any(cti) && <strong>{cti.val}</strong>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {singleLineMultiFieldValueFormatter([otori, otorit, otoril], null, null, [', ', ', '])}
                </p>}
                {any(cl) && <p>{cl.lbl}: {cl.val}</p>}
                {any(dft) && <p>{dft.lbl}: {dft.val}</p>}
                {any(cdesc) && <>
                    {cdesc.val.eng && <StyledBilingualItemContainer>
                        <p>{cdesc.lbl}</p>
                        <p>{cdesc.val.eng}</p>
                    </StyledBilingualItemContainer>}
                    {cdesc.val.fre && <StyledBilingualItemContainer>
                        <p>{cdesc.lbl} (French)</p>
                        <p>{cdesc.val.fre}</p>
                    </StyledBilingualItemContainer>}
                </>}
                {any(cd) &&
                <div>
                    <p><strong>{cd.lbl}: </strong></p>
                    <p>
                        {cd.val.map((val, index) => {
                            return <span key={index}>
                                {singleLineMultiFieldValueFormatter([val.first_name, val.family_name], null, null, [' ', ' '])}
                            </span>
                        })}
                    </p></div>}
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