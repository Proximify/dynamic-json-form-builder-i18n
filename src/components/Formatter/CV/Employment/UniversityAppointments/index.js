import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function UniversityAppointments(props) {
    // console.log("UniversityAppointments", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            appointment_type: at,
            other: ot,
            unit_program: tp,
            appointment_title: ati,
            faculty: fa,
            start_date: sd,
            end_date: ed,
            department_division: dd,
            ending_type: et,
            fte_total: fto,
            fte_research: fr,
            comment: co
        } = ft.getFields();
        return (
            <div>
                {any(at, ot, tp, ati, fa, sd, ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([at, ot, tp, ati, fa, sd, ed], null, ['s', 's', 's', 's', 's', 's', 's'], [', ', ', ', ', ', ', '], [[4, 5, 6,
                        <strong> (</strong>], [5, 5, 6, <strong> - </strong>], [6, 5, 6, <strong>)</strong>]])}
                </p>}
                {any(dd) &&
                <p>
                    <span>{reftableValueParser(dd.val, false, true).map((val, index) => {
                        return reftableValueFormatter(val, index)
                    })}</span>
                </p>}
                {any(et) && <p>{et.lbl}: {et.val}</p>}
                {any(fto, fr) &&
                <p>
                    {singleLineMultiFieldValueFormatter([fto, fr], [true, true], null, [', '])}
                </p>}
                {any(co) && <>
                    {co.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{co.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: co.val.eng}}/>
                    </div>}
                    {co.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{co.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: co.val.fre}}/>
                    </div>}
                </>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                UniversityAppointments
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}