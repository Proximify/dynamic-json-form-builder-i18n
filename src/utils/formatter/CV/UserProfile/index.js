import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueFormatter,
    reftableValueParser,
    singleFieldSubsectionFormatter,
    singleLineMultiFieldValueFormatter
} from "../../utils/helper";
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
                                                                            isFullScreenViewMode={props.isFullScreenViewMode}
                                                                            schema={props.schema}
                                                                            rawData={props.rawData}/>,
        "research_centres": <ResearchCentres structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "technological_applications": <TechnologicalApplications structureChain={props.structureChain}
                                                                 isFullScreenViewMode={props.isFullScreenViewMode}
                                                                 schema={props.schema}
                                                                 rawData={props.rawData}/>,
        "disciplines_trained_in": <DisciplinesTrainedIn structureChain={props.structureChain}
                                                        isFullScreenViewMode={props.isFullScreenViewMode}
                                                        schema={props.schema}
                                                        rawData={props.rawData}/>,
        "research_disciplines": <ResearchDisciplines structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode}
                                                     schema={props.schema}
                                                     rawData={props.rawData}/>,
        "areas_of_research": <AreaOfResearch structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "fields_of_application": <FieldsOfApplication structureChain={props.structureChain}
                                                      isFullScreenViewMode={props.isFullScreenViewMode}
                                                      schema={props.schema}
                                                      rawData={props.rawData}/>,
        "temporal_periods": <TemporalPeriods structureChain={props.structureChain}
                                             isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
                                             rawData={props.rawData}/>,
        "geographical_regions": <GeographicalRegions structureChain={props.structureChain}
                                                     isFullScreenViewMode={props.isFullScreenViewMode}
                                                     schema={props.schema}
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
        return (
            <div>
                {any(rs, rcsd, or) &&
                <p>
                    {rs.val && <><strong>{rs.lbl}: </strong><span>{rs.val} </span></>}
                    {rcsd.val && <span>({rcsd.lbl}: {rcsd.val})</span>}
                    {or.val && <span>{'\u00A0'} {or.val}</span>}
                </p>}
                {any(eicr) && <p>{eicr.val}</p>}
                {any(ktm) && <>
                    {ktm.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ktm.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ktm.val.eng}}/>
                    </div>}
                    {ktm.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ktm.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ktm.val.fre}}/>
                    </div>}
                </>}
                {any(ri) && <>
                    {ri.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ri.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ri.val.eng}}/>
                    </div>}
                    {ri.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ri.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ri.val.fre}}/>
                    </div>}
                </>}
                {any(res) && <>
                    {res.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{res.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: res.val.eng}}/>
                    </div>}
                    {res.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{res.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: res.val.fre}}/>
                    </div>}
                </>}
                <div className="viewModeSubsection">
                    {any(rsk) &&
                    <div><p>{rsk.lbl}</p> <p>{singleFieldSubsectionFormatter(rsk.val, true)}</p></div>}
                    {any(rc) && <div><p>{rc.lbl}</p>
                        {reftableValueParser(rc.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                    {any(ta) && <div><p>{ta.lbl}</p>
                        {reftableValueParser(ta.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
                    {any(dti) && <div><p>{dti.lbl}</p>
                        {reftableValueParser(dti.val, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}</div>}
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
                    {any(tp) &&
                    <div><p>{tp.lbl}</p>
                        <p>{tp.val.sort((a, b) => a.order.val > b.order.val ? 1 : -1).map((val, index) => {
                            return <span key={index}>
                             {singleLineMultiFieldValueFormatter([val.from_year, val.from_year_period, val.to_year, val.to_year_period], null, null, [' ', ['(', ')'], ' ', ['(', ')']], [[1, 0, 3, ' - ']])}
                                {index === tp.val.length - 1 ? null : <span>, </span>}
                        </span>
                        })}</p></div>}
                    {any(gr) && <div><p>{gr.lbl}</p> <p>{singleFieldSubsectionFormatter(gr.val)}</p></div>}
                    {any(co) && <div><p>{co.lbl}</p> <p>{singleFieldSubsectionFormatter(co.val)}</p></div>}
                </div>
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                User Profile
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}