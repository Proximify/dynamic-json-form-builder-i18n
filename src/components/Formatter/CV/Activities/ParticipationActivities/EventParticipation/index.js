import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter, genericFieldFormatter
} from "../../../../utils/helper";

export default function EventParticipation(props) {
    console.log("EventParticipation", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;


    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            event_type:et,
            event_name:en,
            start_date: sd,
            end_date: ed,
            activity_description: ad,
            event_start_date:esd,
            event_end_date:eed
        } = ft.getFields();
        console.log(ft.getFields())
        return (
            <div>
                {any(ro, et, en, sd, ed) && <p>
                    {singleLineMultiFieldValueFormatter([ro, et, en, sd, ed], null, ['s'], [', ', ', '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}
                </p>}
                {any(esd, eed)&&<p>
                    ({esd.val && <span>{esd.lbl}: {esd.val} </span>}
                    <span> - </span>
                    {eed.val && <span>{eed.lbl}: {eed.val}</span>})
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
                {genericFieldFormatter(ft.getUnformattedField())}
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