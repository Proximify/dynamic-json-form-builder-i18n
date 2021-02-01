import React from "react";
import {FieldValueMapper, FormatterTracker, any} from "../../../utils/helper";

export default function Identification(props) {
    // console.log("Identification", props)
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        // console.log(mappedValue)
        const ft = new FormatterTracker(mappedValue);
        const it = ft.getFields();
        const val = ft.getValue();
        const lbl = ft.getLabel();

        // console.log(it)

        return (
            <div className="border border-red-300 m-2 rounded">
                {any(it.title, it.first_name, it.middle_name, it.family_name) ?
                    <p>
                        <span>{val.title} {val.first_name} {val.middle_name} {val.family_name}</span>
                    </p> : null}
                {any(it.previous_family_name) ?
                    <p>{lbl.previous_family_name}{val.previous_family_name}</p> : null}
                {any(it.previous_first_name) ?
                    <p>{lbl.previous_first_name}{val.previous_first_name}</p> : null}
                {any(it.date_of_birth) ? <p>{lbl.date_of_birth}: {val.date_of_birth ?? null}</p> : null}
                {any(it.sex) ? <p>{lbl.sex}{val.sex}</p> : null}
                {any(it.designated_group) ?
                    <p>{lbl.designated_group}: {val.designated_group}</p> : null}
                {any(it.correspondence_language) ?
                    <p>{lbl.correspondence_language}{val.correspondence_language}</p> : null}
                {any(it.canadian_residency_status) ?
                    <p>{lbl.canadian_residency_status}{val.canadian_residency_status}</p> : null}
                {any(it.permanent_residency_start_date) ?
                    <p>{lbl.permanent_residency_start_date}{val.permanent_residency_start_date}</p> : null}
                {any(it.country_of_citizenship) ?
                    <p>{lbl.country_of_citizenship}{val.country_of_citizenship}</p> : null}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        // return (
        //     <React.Fragment>
        //         {sections[props.section]}
        //     </React.Fragment>
        // )
        //}
    }
}