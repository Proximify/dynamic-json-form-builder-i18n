import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter
} from "../../../utils/helper";

export default function LeavesOfAbsenceAndImpactOnResearch(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            leave_type: lt,
            start_date: sd,
            end_date: ed,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            absence_and_impact_description: aaid
        } = ft.getFields();
        return (
            <div>
                {any(lt, sd, ed) &&
                <p>
                    {lt.val && <strong>{lt.val}, </strong>}
                    {any(sd, ed) && <strong>({sd.val} - {ed.val})</strong>}
                </p>}
                {any(ori) && <span>{reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}</span>}
                {any(aaid) && <>
                    {aaid.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{aaid.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: aaid.val.eng}}/>
                    </div>}
                    {aaid.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{aaid.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: aaid.val.fre}}/>
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
                affiliations
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}