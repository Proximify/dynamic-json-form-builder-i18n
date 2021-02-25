import React from "react";
import {any, FieldValueMapper, FormatterTracker ,reftableFormatter} from "../../utils/helper";
import ResearchDisciplines from "./ResearchDisciplines";
import AreaOfResearch from "./AreasOfResearch";
import ResearchCentres from "./ResearchCentres";
import ResearchSpecializationKeywords from "./ResearchSpecializationKeywords";
import GeographicalRegions from "./GeographicalRegions";
import FieldsOfApplication from "./FieldsOfApplication";
import Countries from "./Countries";
import DisciplinesTrainedIn from "./DisciplinesTrainedIn";
import TechnologicalApplications from "./TechnologicalApplications";
import TemporalPeriods from "./TemporalPeriods";

export default function UserProfile(props) {
    // console.log("UserProfile", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    const subsections = {
        "research_specialization_keywords": <ResearchSpecializationKeywords structureChain={props.structureChain}
                                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                        rawData={props.rawData}/>,
        "research_centres": <ResearchCentres structureChain={props.structureChain}
                                                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                  rawData={props.rawData}/>,
        "technological_applications": <TechnologicalApplications structureChain={props.structureChain}
                                                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                  rawData={props.rawData}/>,
        "disciplines_trained_in": <DisciplinesTrainedIn structureChain={props.structureChain}
                                                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                  rawData={props.rawData}/>,
        "research_disciplines": <ResearchDisciplines structureChain={props.structureChain}
                                                                  isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                                  rawData={props.rawData}/>,
        "areas_of_research": <AreaOfResearch structureChain={props.structureChain}
                                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                      rawData={props.rawData}/>,
        "fields_of_application": <FieldsOfApplication structureChain={props.structureChain}
                                                        isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                        rawData={props.rawData}/>,
        "temporal_periods": <TemporalPeriods structureChain={props.structureChain}
                                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                      rawData={props.rawData}/>,
        "geographical_regions": <GeographicalRegions structureChain={props.structureChain}
                                                   isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                   rawData={props.rawData}/>,
        "countries": <Countries structureChain={props.structureChain}
                                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                                      rawData={props.rawData}/>,
    }

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
        console.log(ft.getFields());
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
                    {any(rsk) && <div><p>{rsk.lbl}</p> <p>{rsk.val.eng} {rsk.val.fre ? `(${rsk.val.fre})` : null}</p></div>} error
                    {any(rc) && <div><p>{rc.lbl}</p> <p>{reftableFormatter(rc.val ,true)}</p></div>}
                    {any(ta) && <div><p>{ta.lbl}</p> <p>{reftableFormatter(ta.val, true)}</p></div>}
                    {any(dti) && <div><p>{dti.lbl}</p> <p>{reftableFormatter(dti.val, true)}</p></div>}
                    {any(rd) && <div><p>{rd.lbl}</p> <p>{reftableFormatter(rd.val, true)}</p></div>}
                    {any(aor) && <div><p>{aor.lbl}</p> <p>{reftableFormatter(aor.val, true)}</p></div>}
                    {any(foa) && <div><p>{foa.lbl}</p> <p>{reftableFormatter(foa.val, true)}</p></div>}
                    {any(tp) && <div><p>{tp.lbl}</p> <p>{reftableFormatter(foa.val, true)}</p></div>}
                    {any(gr) && <div><p>{gr.lbl}</p> <p>{reftableFormatter(foa.val, true)}</p></div>}
                    {any(co) && <div><p>{co.lbl}</p> <p>{reftableFormatter(foa.val, true)}</p></div>}
                </div>
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