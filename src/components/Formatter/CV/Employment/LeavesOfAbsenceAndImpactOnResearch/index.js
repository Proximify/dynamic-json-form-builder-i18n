import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
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
                    {singleLineMultiFieldValueFormatter([lt, sd, ed], null, ['s', 's', 's'], [' '],[[0,1,2,<strong> (</strong>],[1,1,2,<strong> - </strong>],[2,1,2,<strong>)</strong>]])}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {otori.val && <span>{otori.val}{otorit.val && ', '}</span>}
                    {otorit.val && <span>{otorit.val}{otoril.val && ', '}</span>}
                    {otoril.val && <span>{otoril.val}</span>}
                </p>}
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