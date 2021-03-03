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

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);

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
        // console.log(fso);
        return (
            <div>
                {any(fr, fsd, fed, fst) &&
                <p>
                    {singleLineMultiFieldValueFormatter([fr, fsd, fed, fst], null, ['s', '', '', 's'], [' ', '', '', [' - ', '']], [[0, 1, 2, ' ('], [1, 1, 2, ' - '], [2, 1, 2, ')']])}
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
                              {singleLineMultiFieldValueFormatter([val.investigator_name, val.role], null, null, [' ', ['(', ')']])}
                            {index === oi.val.length - 1 ? null : <span>, </span>}
                        </span>
                    })}</p></div>}
                    {any(rus) && <div><p>{rus.lbl}</p> <p>{singleFieldSubsectionFormatter(rus.val)}</p></div>}
                    {any(fby) &&
                    <div><p>{fby.lbl}</p>
                        <div>{fby.val.map((val, index) => {
                            return <div key={index}>
                                <p>{singleLineMultiFieldValueFormatter([val.start_date, val.end_date], null, null, [['(', ''], ')'], [[0, ' - ']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.total_funding, val.currency_of_total_funding], [true], null, [' ', ['(', ')']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.portion_of_funding_received, val.currency_of_portion_of_funding_received], [true], null, [' ', ['(', ')']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.time_commitment], [true], null, null)}</p>
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
                    {any(rs) && <div><p>{rs.lbl}</p>
                        {reftableValueParser(rs.val, true, true, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}
                    </div>}
                    {any(fso) &&
                    <div><p>{fso.lbl}</p>
                        <div>{fso.val.map((val, index) => {
                            return <div key={index}>
                                <p>{singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization, val.funding_start_date, val.funding_end_date], null, ['s'], [' '], [[1, 1, 3, ' ('], [2, 2, 3, ' - '], [3, 2, 3, ')']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.program_name, val.funding_reference_number], [false, true], null, null, [[0, 1, 1, ', ']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.total_funding, val.currency_of_total_funding, val['total_funding_(can$)']], [true], null, [' ', ['(', ')'], ['(', ')  CAN']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.portion_of_funding_received, val['portion_of_funding_received_(can$)'], val.currency_of_portion_of_funding_received], [true], null, [' ', ['(', ')  CAN'], ['(',')']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.funding_renewable], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.funding_competitive], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.converted_total_funding], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.converted_total_funding], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.converted_portion_of_funding_received], null, null)}</p>
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