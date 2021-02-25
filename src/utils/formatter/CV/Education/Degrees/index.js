import React from "react";
import {FieldValueMapper, FormatterTracker, any, reftableFormatter} from "../../../utils/helper";

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
        console.log(sup.val)
        return (
            <div>
                {any(dt, dsd, drd) &&
                <p>
                    <span>{dt.val} </span>
                    {any(dsd, drd) && <span>({dsd.val} - {drd.val})</span>}
                </p>}
                {any(dn, spe, ds) && <p>
                    {dn.val && <span>{dn.val.eng} {dn.val.fre && `(${dn.val.fre})`}</span>}
                    {spe.val && <span>, {spe.val.eng} {spe.val.fre && `(${spe.val.fre})`}</span>}
                    {ds.val && <span> ({ds.val})</span>}
                </p>}
                {any(org) && <p>{reftableFormatter(org.val, false, true)}</p>} Error
                {any(tt) && <p>{tt.val}</p>}
                <div className="ml-2">
                    {any(sup) && <div><p>{sup.lbl}</p> sup.val</div>}
                    {any(rd) && <div><p>{rd.lbl}</p> {reftableFormatter(rd.val, true)}</div>}
                    {any(aor) && <div><p>{aor.lbl}</p> <p>{reftableFormatter(aor.val, true)}</p></div>}
                    {any(foa) && <div><p>{foa.lbl}</p> <p>{reftableFormatter(foa.val, true)}</p></div>}
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