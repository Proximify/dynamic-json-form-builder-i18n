import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function CourseDevelopment(props) {
    // console.log("Recognitions", props);
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
                    {cdesc.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{cdesc.lbl}</p>
                        <p>{cdesc.val.eng}</p>
                    </div>}
                    {cdesc.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{cdesc.lbl} (French)</p>
                        <p>{cdesc.val.fre}</p>
                    </div>}
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
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
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