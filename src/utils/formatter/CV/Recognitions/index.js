import React from "react";
import {any, FieldValueMapper, FormatterTracker} from "../../utils/helper";


export default function Recognitions(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            recognition_type: rt,
            recognition_name: rn,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            effective_date: efd,
            end_date: end,
            "amount_(can$)": amc,
            description: desc,
            currency: cur,
            research_disciplines: redis,
            areas_of_research: aor,
            fields_of_application: foa,
            converted_amount: ca
        } = ft.getFields();

        return (
            <div>
                {any(rt, rn) &&
                <p>
                    {rt.val} {rn.val}
                </p>}
                {any(efd, end, ori) &&
                <>
                    {any(efd, end) && <span>({efd.val - end.val})</span>}
                    {any(ori) && <span>{ori.val}</span>}
                </>
                }
                {any(desc) &&
                <>
                    <p>{desc.lbl}</p>
                    <p>{desc.val}</p>
                </>}
                <div className="ml-2">
                    {any(redis) && <p>{redis.lbl}: {redis.val}</p>}
                    {any(aor) && <p>{aor.lbl}: {aor.val}</p>}
                    {any(foa) &&
                    <p>{foa.lbl}: {foa.val}</p>}
                </div>
                {any(ca) && <p>{ca.lbl}: {ca.val}</p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                Recognitions
            </React.Fragment>
        )
    }
}