import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter
} from "../../../utils/helper";

export default function Affiliations(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            position_title: pti,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            department: de,
            activity_description: ad,
            start_date: sd,
            end_date: ed,
        } = ft.getFields();
        return (
            <div>
                {any(pti, sd, ed) &&
                <p>
                    {pti.val && <strong>{pti.val.eng} {pti.val.fre &&
                    <span className="secondLang">{`(${pti.val.fre}) `}</span>}</strong>}
                    {any(sd, ed) && <strong>({sd.val} - {ed.val})</strong>}
                </p>}
                {any(ori) && <span>{reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}</span>}
                {any(de) && <p>{de.val}</p>}
                {any(ad) && <p>{ad.val}</p>}
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