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
    // console.log("StudentPostdoctoralSupervision", props);
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
                    {singleLineMultiFieldValueFormatter([sur, ssd, sed], null, ['s'], [' '], [[0, 1, 2, ' ('], [1, 1, 2, ' - '], [2, 1, 2, ')']])}
                    {/*{sur.val && <strong>{sur.val} </strong>}*/}
                    {/*{any(ssd, sed) && <span>({ssd.val} - {sed.val})</span>}*/}
                </p>}
                {any(sn, spl, sds, sdsd, sdrd, sded) && <p>
                    {singleLineMultiFieldValueFormatter([sn, spl, sds, sdsd, sdrd, sded], null, ['s', '', 's'], [', ', ', '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}
                </p>}
                {any(si, po) && <p>
                    {singleLineMultiFieldValueFormatter([si, po], null, null, [', '])}
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
                            {singleLineMultiFieldValueFormatter([val.first_name, val.family_name, val.role], null, null, [' ', ' ', ['(', ')']])}
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
                                <p>{singleLineMultiFieldValueFormatter([val.funding_reference_number, val.amount, val.currency], [true, true], null, [', ', ', ', ['(', ')']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization], null, null, [' ', ' '])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.converted_amount], [true], null, null)}</p>

                            </div>
                        })}</div>
                    </div>}
                    {any(str) &&
                    <div><p>{str.lbl}</p>
                        <div>{str.val.map((val, index) => {
                            return <div key={index}>
                                <p>{singleLineMultiFieldValueFormatter([val.recognition_type, val.recognition_name, val.start_date, val.end_date], null, null, [', '], [[1, 2, 3, ' ('], [2, 2, 3, ' - '], [3, 2, 3, ')']])}</p>
                                <p>{val.organization.val && reftableValueParser(val.organization.val, false, true).map((val, index) => {
                                    return reftableValueFormatter(val, index)
                                })}
                                    {singleLineMultiFieldValueFormatter([val.organization, val.other_organization_type, val.other_organization_location, val.other_organization], null, null, [' ', ', ', ', '])}
                                </p>
                                <p>{singleLineMultiFieldValueFormatter([val['amount_(can$)'], val.amount, val.currency], [true], null, [' ', ['(', ') ']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.converted_amount], [true], null, null)}</p>
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