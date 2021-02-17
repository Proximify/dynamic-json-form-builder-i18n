import React from "react";
import {any, FieldValueMapper, FormatterTracker} from "../../utils/helper";

export default function UserProfile(props) {
    // console.log("UserProfile", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            researcher_status: rs,
            research_career_start_date: rcsd,
            engaged_in_clinical_research: eicr,
            key_theory_methodology: ktm,
            research_interests: ri,
            research_experience_summary: res,
            research_specialization_keywords: rsk,
            research_centres: rc,
            technological_applications: ta,
            disciplines_trained_in: dti,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa,
            temporal_periods: tp,
            geographical_regions: gr,
            countries: co,
            orcid: or
        } = ft.getFields();
        return (
            <div>
                {any(rs, rcsd) &&
                <>
                    {any(rc) && <span>{rs.lbl}: {rs.val}</span>}
                    {any(rcsd) && <span>({rcsd.lbl}: {rcsd.val})</span>}
                </>}
                {any(eicr) && <p>{eicr.val}</p>}
                {any(ktm) && <>
                    {ktm.val.eng && <div><p>{ktm.lbl}</p><p>{ktm.val.eng}</p></div>}
                    {ktm.val.fre && <div><p>{ktm.lbl} (french)</p><p>{ktm.val.fre}</p></div>}
                </>}
                {any(ri) && <>
                    {ri.val.eng && <div><p>{ri.lbl}</p><p>{ri.val.eng}</p></div>}
                    {ri.val.fre && <div><p>{ri.lbl} (french)</p><p>{ri.val.fre}</p></div>}
                </>}
                {any(res) && <>
                    {res.val.eng && <div><p>{res.lbl}</p><p>{res.val.eng}</p></div>}
                    {res.val.fre && <div><p>{res.lbl} (french)</p><p>{res.val.fre}</p></div>}
                </>}
                <div className="ml-2">
                    {any(rsk) && <div><p>{rsk.lbl}</p> <p>{rsk.val.eng} ({rsk.val.fre})</p></div>}
                    {any(rc) && <div><p>{rc.lbl}</p> <p>{rc.val}</p></div>}
                    {any(ta) && <div><p>{ta.lbl}</p> <p>{ta.val}</p></div>}
                    {any(dti) && <div><p>{dti.lbl}</p> <p>{dti.val}</p></div>}
                    {any(rd) && <div><p>{rd.lbl}</p> <p>{rd.val}</p></div>}
                    {any(aor) && <div><p>{aor.lbl}</p> <p>{aor.val}</p></div>}
                    {any(foa) && <div><p>{foa.lbl}</p> <p>{foa.val}</p></div>}
                    {any(tp) && <div><p>{tp.lbl}</p> <p>{tp.val}</p></div>}
                    {any(gr) && <div><p>{gr.lbl}</p> <p>{gr.val}</p></div>}
                    {any(co) && <div><p>{co.lbl}</p> <p>{co.val}</p></div>}
                </div>


                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                UserProfile
            </React.Fragment>
        )
    }
}