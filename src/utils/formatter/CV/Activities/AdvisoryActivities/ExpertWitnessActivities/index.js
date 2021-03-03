import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function ExpertWitnessActivities(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;


    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            case: ca,
            location: lo,
            city: ci,
            start_date: sd,
            end_date: ed,
            activity_description: ad
        } = ft.getFields();

        return (
            <div>
                {any(ro, ca, lo,ci) && <p>
                    {singleLineMultiFieldValueFormatter([ro, ca, lo,ci], null, ['s'], [', ', ', ', ', '])}
                </p>}
                {any(sd, ed) && <p>
                    <span>({sd.val} - {ed.val})</span>
                </p>}
                {any(ad) && <>
                    {ad.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ad.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.eng}}/>
                    </div>}
                    {ad.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ad.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ad.val.fre}}/>
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
                EventAdministration
            </React.Fragment>
        )
    }
}