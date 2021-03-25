import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function Workload(props) {
    // console.log("Workload", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            reporting_start_date: rsd,
            reporting_end_date: red,
            undergraduate_teaching: ut,
            graduate_professional_teaching: gpt,
            external_teaching: et,
            internal_activities: ia,
            academic_administration: aa,
            external_activities: ea,
            total_workload: tw,
            additional_comments: ac
        } = ft.getFields();
        return (
            <div>
                {any(rsd, red) &&
                <p>
                    <span>{rsd.val} - {red.val}</span>
                </p>}
                {any(ut) && <p>{ut.lbl}: {ut.val}</p>}
                {any(gpt) && <p>{gpt.lbl}: {gpt.val}</p>}
                <div className="viewModeSubsection">
                    {any(et) && <div><p>{et.lbl}</p>
                        {et.val.map((val, index) => {
                            return <div key={index}>
                                <p>{singleLineMultiFieldValueFormatter([val.institution_or_faculty, val.external_workload], null, null, [' '])}</p>
                            </div>
                        })}</div>}
                </div>
                {any(ia) && <p>{ia.lbl}: {ia.val}</p>}
                {any(aa) && <p>{aa.lbl}: {aa.val}</p>}
                {any(ea) && <p>{ea.lbl}: {ea.val}</p>}
                {any(tw) && <p>{tw.lbl}: {tw.val}</p>}
                {any(ac) && <>
                    {ac.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ac.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ac.val.eng}}/>
                    </div>}
                    {ac.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ac.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ac.val.fre}}/>
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
                Workload
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}