import React from "react";
import CountryOfCitizenship from "./CountryOfCitizenship";
import {FieldValueMapper, FormatterTracker, any, reftableValueParser,singleFieldSubsectionFormatter} from "../../../utils/helper";

export default function Identification(props) {
    // console.log("Identification", props)
    const {rawData,schema} = props;
    const formData = rawData.values;

    const subsections = {
        "country_of_citizenship": <CountryOfCitizenship structureChain={props.structureChain}
                                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                        rawData={props.rawData}/>
    }

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
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
            <div>
                {any(t, fin, mn, fan) &&
                <p className="font-bold text-lg">
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
                <p>{coc.lbl}: {singleFieldSubsectionFormatter(coc.val)}</p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                {props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}
            </React.Fragment>
        )
    }
}