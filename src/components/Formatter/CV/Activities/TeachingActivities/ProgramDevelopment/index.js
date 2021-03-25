import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function ProgramDevelopment(props) {
    // console.log("Recognitions", props);
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
                    {pd.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{pd.lbl}</p>
                        <p>{pd.val.eng}</p>
                    </div>}
                    {pd.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{pd.lbl} (French)</p>
                        <p>{pd.val.fre}</p>
                    </div>}
                </>}
                {any(dp) && <p>{dp.val}</p>}
                {any(uic) && <>
                    {uic.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{uic.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: uic.val.eng}}/>
                    </div>}
                    {uic.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{uic.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: uic.val.fre}}/>
                    </div>}
                </>}
                <div className="viewModeSubsection">
                    {any(cl) && <div><p>{cl.lbl}: </p><p>{cl.val}</p></div>}
                    {any(cd) &&
                    <div><p>{cd.lbl}: </p> <p>{cd.val.map((val, index) => {
                        return <span key={index}>
                                {singleLineMultiFieldValueFormatter([val.first_name, val.family_name], null, null, [' '])}
                            </span>
                    })}</p></div>}
                    {any(dft) && <div><p>{dft.lbl}: </p><p>{dft.val}</p></div>}
                </div>
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