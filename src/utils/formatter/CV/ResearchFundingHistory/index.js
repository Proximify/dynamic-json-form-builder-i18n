import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueFormatter,
    reftableValueParser,
    singleFieldSubsectionFormatter
} from "../../utils/helper";

export default function ResearchFundingHistory(props) {
    // console.log("ResearchFundingHistory", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    const subsections = {
        // "research_specialization_keywords": <ResearchSpecializationKeywords structureChain={props.structureChain}
        //                                                                     isFullScreenViewMode={props.isFullScreenViewMode}
        //                                                                     schema={props.schema}
        //                                                                     rawData={props.rawData}/>,
        // "research_centres": <ResearchCentres structureChain={props.structureChain}
        //                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                      rawData={props.rawData}/>,
        // "technological_applications": <TechnologicalApplications structureChain={props.structureChain}
        //                                                          isFullScreenViewMode={props.isFullScreenViewMode}
        //                                                          schema={props.schema}
        //                                                          rawData={props.rawData}/>,
        // "disciplines_trained_in": <DisciplinesTrainedIn structureChain={props.structureChain}
        //                                                 isFullScreenViewMode={props.isFullScreenViewMode}
        //                                                 schema={props.schema}
        //                                                 rawData={props.rawData}/>,
        // "research_disciplines": <ResearchDisciplines structureChain={props.structureChain}
        //                                              isFullScreenViewMode={props.isFullScreenViewMode}
        //                                              schema={props.schema}
        //                                              rawData={props.rawData}/>,
        // "areas_of_research": <AreaOfResearch structureChain={props.structureChain}
        //                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                      rawData={props.rawData}/>,
        // "fields_of_application": <FieldsOfApplication structureChain={props.structureChain}
        //                                               isFullScreenViewMode={props.isFullScreenViewMode}
        //                                               schema={props.schema}
        //                                               rawData={props.rawData}/>,
        // "temporal_periods": <TemporalPeriods structureChain={props.structureChain}
        //                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                      rawData={props.rawData}/>,
        // "geographical_regions": <GeographicalRegions structureChain={props.structureChain}
        //                                              isFullScreenViewMode={props.isFullScreenViewMode}
        //                                              schema={props.schema}
        //                                              rawData={props.rawData}/>,
        // "countries": <Countries structureChain={props.structureChain}
        //                         isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                         rawData={props.rawData}/>,
    }

    /**
     * "[{funding_role} ][({funding_start_date} - {funding_end_date}) ][- {funding_status}]",
     "{funding_title}",
     "[{funding_type}], [{grant_type}]",
     "{project_description}",
     "[{clinical_research_project}]",
     "[{research_uptake}]"
     *
     *
     */

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        console.log(mappedValue)

        const ft = new FormatterTracker(mappedValue);
        const {
            funding_role: fr,
            funding_start_date: fsd,
            funding_end_date: fed,
            funding_status: fst,
            funding_title: fti,
            funding_type: fty,
            grant_type: gt,
            project_description: pd,
            clinical_research_project: crp,
            research_uptake: ru,
            other_investigators: oi,
            research_uptake_stakeholders: rus,
            funding_by_year: fby,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa,
            research_settings: rs,
            funding_sources: fso
        } = ft.getFields();
        // console.log(rs);
        return (
            <div>
                {any(fr, fsd, fed, fst) &&
                <p>
                    {fr.val && <><strong>{fr.lbl}: </strong>
                        {any(fsd, fed) && <span>({fsd.val} - {fed.val})</span>}
                        {fst.val && <> - <strong>{fst.val}</strong></>}
                    </>}
                </p>}
                {any(fti) && <p><i>{fti.val}</i></p>}
                {any(fty, gt) && <p>
                    {fty.val && <span>{`${fty.val}${gt.val ? ', ' : ''}`}</span>}
                    {gt.val && <span>{gt.val}</span>}
                </p>}
                {any(pd) && <>
                    {pd.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{pd.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: pd.val.eng}}/>
                    </div>}
                    {pd.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{pd.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: pd.val.fre}}/>
                    </div>}
                </>}
                {any(crp) && <p>{crp.val}</p>}
                {any(ru) && <>
                    {ru.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ru.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ru.val.eng}}/>
                    </div>}
                    {ru.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ru.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ru.val.fre}}/>
                    </div>}
                </>}
                <div className="viewModeSubsection">
                    {any(oi) &&
                    <div><p>{oi.lbl}</p> <p>{oi.val.map((val, index) => {
                        return <span key={index}>
                            {val.investigator_name
                            && <span>{val.investigator_name}</span>}
                            {val.role && <span> ({val.role})</span>}
                        </span>
                    })}</p></div>}
                    {any(rus) && <div><p>{rus.lbl}</p> <p>{singleFieldSubsectionFormatter(rus.val)}</p></div>}
                    {any(fby) &&
                    <div><p>{fby.lbl}</p>
                        <div>{fby.val.map((val, index) => {
                            return <div key={index}>
                                {(val.start_date || val.end_date) && <p>({val.start_date} - {val.end_date})</p>}
                                {val.total_funding &&
                                <p>{fby.rawValue[index].total_funding.label}: {val.total_funding} {val.currency_of_total_funding &&
                                <span>({val.currency_of_total_funding})</span>}</p>}
                                {val.portion_of_funding_received &&
                                <p>{fby.rawValue[index].portion_of_funding_received.label}: {val.portion_of_funding_received} {val.currency_of_portion_of_funding_received &&
                                <span>({val.currency_of_portion_of_funding_received})</span>}</p>}
                                {val.time_commitment &&
                                <p>{fby.rawValue[index].time_commitment.label}: {val.time_commitment}</p>}
                            </div>
                        })}</div>
                    </div>}
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
                    {any(rs) && <div><p>{rs.lbl}</p><p>{rs.val.map((val, index) => {
                        return <span
                            key={index}><span>{reftableValueParser(val.location, false, true, true).map((refVal, index) => {
                            return reftableValueFormatter(refVal, index)
                        })}</span>{val.setting_type &&
                        <span>, {val.setting_type}</span>}{index < rs.val.length - 1 ? ', ' : ''} </span>
                    })}</p>
                    </div>}
                    {any(fso) &&
                    <div><p>{fso.lbl}</p>
                        <div>{fso.val.map((val, index) => {
                            return <div key={index}>
                                {val.funding_organization &&
                                <p><strong>{val.funding_organization}{val.other_funding_organization &&
                                <span>, {val.other_funding_organization}</span>}</strong>
                                    {(val.funding_start_date || val.funding_end_date) &&
                                    <span> ({val.funding_start_date} - {val.funding_end_date})</span>}</p>}
                                {(val.program_name || val.funding_reference_number) &&
                                <p><span>{val.program_name}</span>{val.funding_reference_number &&
                                <span>, {fso.rawValue[index].funding_reference_number.label}: {val.funding_reference_number}</span>}
                                </p>}
                                {val.total_funding &&
                                <p>{fso.rawValue[index].total_funding.label}: {val.total_funding} {val.currency_of_total_funding &&
                                <span>({val.currency_of_total_funding})</span>}</p>}
                                {val.portion_of_funding_received &&
                                <p>{fso.rawValue[index].portion_of_funding_received.label}: {val.portion_of_funding_received} {val.currency_of_portion_of_funding_received &&
                                <span>({val.currency_of_portion_of_funding_received})</span>}</p>}
                                {val.funding_renewable && <p>{val.funding_renewable}</p>}
                                {val.funding_competitive && <p>{val.funding_competitive}</p>}
                            </div>
                        })}</div>
                    </div>}
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