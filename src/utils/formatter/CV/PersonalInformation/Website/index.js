import React from "react";
import {FieldValueMapper, FormatterTracker, any} from "../../../utils/helper";

export default function Website(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            url: u,
            website_type: wt
        } = ft.getFields();

        return (
            <div>
                {any(u, wt) &&
                <p>
                    <span>{wt.val && `${wt.val}: `}</span>
                    <a href={u} className="text-blue-500 hover:underline"> {u.val}</a>
                </p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
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