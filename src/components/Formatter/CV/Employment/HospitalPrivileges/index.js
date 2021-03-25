import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function HospitalPrivileges(props) {
    // console.log("UniversityAppointments", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            status: st,
            appointment_type: ap,
            appointment_category: ac,
            board_appointment_date: bad,
            department_division: dd,
            hospital: ho,
            sites:si,
            privilege:pr,
            start_date:sd,
            end_date: ed,
            afp_association:aa,
            review_requested:rr,
            comment: co
        } = ft.getFields();
        return (
            <div>
                {any(st,ap,ac,bad) &&
                <p>
                    {singleLineMultiFieldValueFormatter([st,ap,ac,bad], null, ['s', 's', 's'], [', ', ', ', ', '])}
                </p>}
                {any(dd) &&
                <p>
                    <span>{reftableValueParser(dd.val, false, true).map((val, index) => {
                        return reftableValueFormatter(val, index)
                    })}</span>
                </p>}
                {any(ho,si) &&
                <p>
                    {singleLineMultiFieldValueFormatter([ho,si], null,null, [', '])}
                </p>}
                {any(pr,sd,ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([pr,sd,ed], null,null, [' '], [[0, 1, 2, '('], [1, 1, 2, ' - '], [2, 1, 2, ')']])}
                </p>}
                {any(aa,rr) &&
                <p>
                    {singleLineMultiFieldValueFormatter([aa,rr], null,null, [', '])}
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
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                HospitalPrivileges
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}