import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueFormatter,
    reftableValueParser,
    singleFieldSubsectionFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function StudentPostdoctoralSupervision(props) {
    console.log("StudentPostdoctoralSupervision", props);
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

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);

        const ft = new FormatterTracker(mappedValue);
        const {
            supervision_role: sur,
            supervision_start_date: ssd,
            supervision_end_date: sed,
            student_name: sn,
            study_postdoctoral_level: spl,
            student_degree_status: sds,
            student_degree_start_date: sdsd,
            student_degree_received_date: sdrd,
            student_degree_expected_date: sded,
            student_institution: si,
            present_organization: po,
            degree_name: dn,
            specialization: sp,
            student_canadian_residency_status: scrs,
            student_country_of_citizenship: scoc,
            present_position: pp,
            thesis_project_title: tpt,
            other_supervisors: os,
            project_description: pd,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa,
            project_funding_sources: pfs,
            student_recognitions: str
        } = ft.getFields();
        return (
            <div>
                {any(sur, ssd, sed) && <p>
                    {sur.val && <strong>{sur.val} </strong>}
                    {any(ssd, sed) && <span>({ssd.val} - {sed.val})</span>}
                </p>}
                {any(sn, spl, sds, sdsd, sdrd, sded) && <p>
                    {sn.val && <strong>{sn.val}, </strong>}
                    {spl.val && <span>{spl.val}, </span>}
                    {sds.val && <strong>{sds.val} </strong>}
                    {any(sdsd, sdrd, sded) && <span>({sdsd.val} - {sdrd.val}{sded.val})</span>}
                </p>}
                {any(si, po) && <p>
                    {si.val && <span>{si.val}{po.val && ', '}</span>}
                    {po.val && <span>{po.val}</span>}
                </p>}
                {any(dn) && <>
                    {dn.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{dn.lbl}</p>
                        <p>{dn.val.eng}</p>
                    </div>}
                    {dn.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{dn.lbl} (French)</p>
                        <p>{dn.val.fre}</p>
                    </div>}
                </>}
                {any(sp) && <>
                    {sp.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{sp.lbl}</p>
                        <p>{sp.val.eng}</p>
                    </div>}
                    {sp.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{sp.lbl} (French)</p>
                        <p>{sp.val.fre}</p>
                    </div>}
                </>}
                {any(scrs) && <p>{scrs.lbl}: {scrs.val}</p>}
                {any(scoc) && <div><p>{scoc.lbl}:</p> <p>{singleFieldSubsectionFormatter(scoc.val)}</p></div>}
                {any(pp) && <p>{pp.lbl}: {pp.val}</p>}
                {any(tpt) && <p>{tpt.lbl}: {tpt.val}</p>}
                {any(os) &&
                <div><p>{os.lbl}:</p>
                    <p>{os.val.map((val, index) => {
                        return <span key={index}>
                            <span>{val.first_name} {val.family_name}{val.role && ` (${val.role})`}</span>
                            {index < os.val.length - 1 ? ', ' : ''}
                        </span>
                    })}</p>
                </div>}
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
                <div className="viewModeSubsection">
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
                    {any(pfs) &&
                    <div><p>{pfs.lbl}</p>
                        <div>{pfs.val.map((val, index) => {
                            return <div key={index}>
                                {(val.funding_reference_number || val.amount || val.currency) &&
                                <p>{val.funding_reference_number &&
                                <span>{pfs.rawValue[index].funding_reference_number.label}: {val.funding_reference_number}{val.amount && ', '}</span>}
                                    {val.amount &&
                                    <span>{pfs.rawValue[index].amount.label}: {val.amount}{val.currency && ' '}</span>}
                                    {val.currency && <span>{val.currency}</span>}
                                </p>}
                                {(val.funding_organization || val.other_funding_organization) &&
                                <p>
                                    {val.funding_organization && <span>{val.funding_organization} </span>}
                                    {val.other_funding_organization && <span>{val.other_funding_organization}</span>}
                                </p>}
                            </div>
                        })}</div>
                    </div>}
                    {any(str) &&
                    <div><p>{str.lbl}</p>
                        <div>{str.val.map((val, index) => {
                            return <div key={index}>
                                {/*{singleLineMultiFieldValueFormatter([val.recognition_type, val.recognition_name, val.start_date, val.end_date], [*/}
                                {/*    <strong>{str.rawValue[index].recognition_type.label + ': '}</strong>], null, [', ', ', '].concat(val.start_date && val.end_date ? [['(', ' - '], [')']] : [['(', ' - '], [' - ', ')']]))}*/}
                                {singleLineMultiFieldValueFormatter([val.recognition_type, val.recognition_name, val.start_date, val.end_date], [
                                    <strong>{str.rawValue[index].recognition_type.label + ': '}</strong>], null, [', ', ', '].concat(val.start_date && val.end_date ? [['(', ' - '], [')']] : [['(', ' - '], [' - ', ')']]))}
                                {/*{(val.recognition_type || val.recognition_name || val.start_date || val.end_date) &&*/}
                                {/*<p>*/}
                                {/*    {val.recognition_type &&*/}
                                {/*    <span>{val.recognition_type}, </span>}*/}
                                {/*    {val.recognition_name &&*/}
                                {/*    <span>{val.recognition_name}, </span>}*/}
                                {/*    {val.recognition_name &&*/}
                                {/*    <span>{val.recognition_name}, </span>}*/}

                                {/*    /!*{val.amount &&*!/*/}
                                {/*    /!*<span>{pfs.rawValue[index].amount.label}: {val.amount}{val.currency && ' '}</span>}*!/*/}
                                {/*    /!*{val.currency && <span>{val.currency}</span>}*!/*/}
                                {/*</p>}*/}

                                {/*{val.funding_organization &&*/}
                                {/*<p><strong>{val.funding_organization}{val.other_funding_organization &&*/}
                                {/*<span>, {val.other_funding_organization}</span>}</strong>*/}
                                {/*    {(val.funding_start_date || val.funding_end_date) &&*/}
                                {/*    <span> ({val.funding_start_date} - {val.funding_end_date})</span>}</p>}*/}
                                {/*{(val.program_name || val.funding_reference_number) &&*/}
                                {/*<p><span>{val.program_name}</span>{val.funding_reference_number &&*/}
                                {/*<span>, {fso.rawValue[index].funding_reference_number.label}: {val.funding_reference_number}</span>}*/}
                                {/*</p>}*/}
                                {/*{val.total_funding &&*/}
                                {/*<p>{fso.rawValue[index].total_funding.label}: {val.total_funding} {val.currency_of_total_funding &&*/}
                                {/*<span>({val.currency_of_total_funding})</span>}</p>}*/}
                                {/*{val.portion_of_funding_received &&*/}
                                {/*<p>{fso.rawValue[index].portion_of_funding_received.label}: {val.portion_of_funding_received} {val.currency_of_portion_of_funding_received &&*/}
                                {/*<span>({val.currency_of_portion_of_funding_received})</span>}</p>}*/}
                                {/*{val.funding_renewable && <p>{val.funding_renewable}</p>}*/}
                                {/*{val.funding_competitive && <p>{val.funding_competitive}</p>}*/}
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