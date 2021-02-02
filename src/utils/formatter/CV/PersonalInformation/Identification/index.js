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
        // // const it = ft.getFields();
        // console.log(ft.getFields())
        const {
            applied_for_permanent_residency: afpr,
            canadian_residency_status: crs,
            correspondence_language: cl,
            country_of_citizenship: coc,
            date_of_birth: dob,
            designated_group: dg,
            family_name: fan,
            first_name: fin,
            middle_name: mn,
            permanent_residency_start_date: prsd,
            previous_family_name: pfan,
            previous_first_name: pfin,
            sex: s,
            title: t,
        } = ft.getFields();

        return (
            <div className="border border-red-300 m-2 rounded">
                {any(t, fin, mn, fan) &&
                <p>
                    {t.val} {fin.val} {mn.val} {fan.val}
                </p>}
                {any(pfan) &&
                    <p>{pfan.lbl}: {pfan.val}</p>}
                {any(pfin) &&
                    <p>{pfin.lbl}: {pfin.val}</p>}
                {any(dob) && <p>{dob.lbl}: {dob.val}</p>}
                {any(s) && <p>{s.lbl}: {s.val}</p>}
                {any(dg) &&
                    <p>{dg.lbl}: {dg.val}</p>}
                {any(cl) &&
                    <p>{cl.lbl}: {cl.val}</p>}
                {any(crs) &&
                    <p>{crs.lbl}: {crs.val}</p>}
                {any(prsd) &&
                    <p>{prsd.lbl}: {prsd.val}</p>}
                {any(afpr) && <p>{afpr.lbl}</p>}
                {any(coc) &&
                    <p>{coc.lbl}: {coc.val}</p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    }
else
    {
        // return (
        //     <React.Fragment>
        //         {sections[props.section]}
        //     </React.Fragment>
        // )
        //}
    }
}