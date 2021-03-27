import React from "react";
import {FieldValueMapper, FormatterTracker, any, genericFieldFormatter} from "../../../utils/helper";

export default function Email(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            email_address: ea,
            email_end_date: eed,
            email_start_date: esd,
            email_type: et
        } = ft.getFields();

        return (
            <div>
                {any(ea, eed, esd, et) &&
                <p>
                    <>{et.val && <strong>{`${et.val}: `}</strong>}{ea.val}</>
                    {any(eed, esd) && <span> ({esd.val} - {eed.val})</span>}
                </p>}
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        return (
            <React.Fragment>
                Email
            </React.Fragment>
        )
    }
}