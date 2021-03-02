import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    any,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function Degree(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);

        const {
            degree_type: dt,
            degree_name: dn,
            specialization: spe,
            thesis_title: tt,
            organization: org,
            other_organization: oorg,
            other_organization_type: oorgt,
            other_organization_location: oorgl,
            degree_status: ds,
            degree_start_date: dsd,
            degree_received_date: drd,
            degree_expected_date: ded,
            transferred_to_phd_without_completing_masters: ttpwcm,
            supervisors: sup,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa
        } = ft.getFields();
        console.log(rd)
        return (
            <div>
                {any(dt, dsd, drd) &&
                <p>
                    <strong>{dt.val} </strong>
                    {any(dsd, drd) && <span>({dsd.val} - {drd.val})</span>}
                </p>}
                {any(dn, spe, ds) && <p>
                    {dn.val && <>{dn.val.eng} {dn.val.fre &&
                    <span className="secondLang">{`(${dn.val.fre})`}</span>}</>}
                    {spe.val && <>, {spe.val.eng} {spe.val.fre &&
                    <span className="secondLang">{`(${spe.val.fre})`}</span>}</>}
                    {ds.val && <span> ({ds.val})</span>}
                </p>}
                {any(org) && <p>{reftableValueParser(org.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}</p>}
                {any(tt) && <p>{tt.val}</p>}
                <div className="viewModeSubsection">
                    {any(sup) &&
                    <div><p>{sup.lbl}</p> <p>{sup.val.map((val, index) => {
                        return <span key={index}>
                            {singleLineMultiFieldValueFormatter([val.supervisor_name, val.start_date, val.end_date], null, null, [' ', ['(', ' - '], [')']])}
                            {index < sup.val.length - 1 && ', '}
                        </span>
                    })}</p></div>}
                    {any(rd) && <div><p>{rd.lbl}</p>
                        {reftableValueParser(rd.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                    {any(aor) && <div><p>{aor.lbl}</p>
                        {reftableValueParser(aor.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                    {any(foa) && <div><p>{foa.lbl}</p>
                        {reftableValueParser(foa.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                </div>
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                Degree
            </React.Fragment>
        )
    }
}