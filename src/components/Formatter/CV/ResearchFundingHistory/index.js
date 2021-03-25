import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueFormatter,
    reftableValueParser,
    singleFieldSubsectionFormatter,
    singleLineMultiFieldValueFormatter, unformattedFieldFormatter
} from "../../utils/helper";

export default function ResearchFundingHistory(props) {
    // console.log("ResearchFundingHistory", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

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
                                <p>{singleLineMultiFieldValueFormatter([val.start_date, val.end_date], null, null, [['(', ''], ')'], [[0, 1, 2, ' - ']])}</p>
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
                                <p>{singleLineMultiFieldValueFormatter([val.organization_type, val.funding_organization, val.other_funding_organization, val.funding_start_date, val.funding_end_date], null, ['s'], [', '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.program_name, val.funding_reference_number], [false, true], null, null, [[0, 1, 1, ', ']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.total_funding, val.currency_of_total_funding, val['total_funding_(can$)']], [true], null, [' ', ['(', ')'], ['(', ')  CAN']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.portion_of_funding_received, val['portion_of_funding_received_(can$)'], val.currency_of_portion_of_funding_received], [true], null, [' ', ['(', ')  CAN'], ['(', ')']])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.funding_renewable], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.funding_competitive], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.converted_total_funding], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.converted_portion_of_funding_received], null, null)}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.internally_funded], null, null)}</p>
                            </div>
                        })}</div>
                    </div>}
                </div>
                {unformattedFieldFormatter(ft.getUnformattedField())}

            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            stakeholder: st,
            location: lo,
            setting_type: sty,
            research_discipline: rd,
            area_of_research: aor,
            field_of_application: foa,
            investigator_name: ina,
            role: ro
        } = ft.getFields();
        // console.log(ft.getFields())
        if (subsection) {
            let formattedValue = null;
            switch (subsection) {
                case 'research_uptake_stakeholders':
                    formattedValue = <p>{singleFieldSubsectionFormatter(st.val, true)}</p>;
                    break;
                case 'research_settings':
                    formattedValue = <p>{reftableValueParser(lo.val, false, false, true).map((val, index) => {
                        return reftableValueFormatter(val, index, true)
                    })}{lo.val && sty.val ? ', ' : ''}{singleFieldSubsectionFormatter(sty.val, true)}</p>
                    break;
                case 'funding_sources': {
                    const {
                        organization_type: ot,
                        funding_organization: fo,
                        other_funding_organization: ofo,
                        funding_start_date: fsd,
                        funding_end_date: fed,
                        program_name: pn,
                        funding_reference_number: frn,
                        total_funding: tf,
                        currency_of_total_funding: cotf,
                        'total_funding_(can$)': tfc,
                        portion_of_funding_received: pofr,
                        'portion_of_funding_received_(can$)': pofrc,
                        currency_of_portion_of_funding_received: copofr,
                        funding_renewable: fr,
                        funding_competitive: fc,
                        internally_funded: inf,
                        converted_total_funding: ctf,
                        converted_portion_of_funding_received: cpofr,
                    } = ft.getFields();

                    formattedValue = <div className='space-y-1.5'>
                        <p>{singleLineMultiFieldValueFormatter([ot, fo, ofo, fsd, fed], null, ['s'], [' '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}</p>
                        <p>{singleLineMultiFieldValueFormatter([pn, frn], [false, true], null, null, [[0, 1, 1, ', ']])}</p>
                        <p>{singleLineMultiFieldValueFormatter([tf, cotf, tfc], [true], null, [' ', ['(', ')'], ['(', ')  CAN']])}</p>
                        <p>{singleLineMultiFieldValueFormatter([pofr, pofrc, copofr], [true], null, [' ', ['(', ')  CAN'], ['(', ')']])}</p>
                        <p>{singleLineMultiFieldValueFormatter([fr], null, null)}</p>
                        <p>{singleLineMultiFieldValueFormatter([fc], null, null)}</p>
                        <p>{singleLineMultiFieldValueFormatter([inf], null, null)}</p>
                        {(ctf.val || ctf.val === 0) && <p>{ctf.lbl}: {ctf.val}</p>}
                        {(cpofr.val || cpofr.val === 0) && <p>{cpofr.lbl}: {cpofr.val}</p>}
                    </div>
                    break;
                }
                case 'funding_by_year': {
                    const {
                        total_funding: tf,
                        start_date: sd,
                        end_date: ed,
                        currency_of_total_funding: cotf,
                        portion_of_funding_received: pofr,
                        currency_of_portion_of_funding_received: copofr,
                        time_commitment: tc
                    } = ft.getFields();
                    formattedValue = <div className='space-y-1.5'>
                        <p>{singleLineMultiFieldValueFormatter([sd, ed], null, null, [['(', ''], ')'], [[0, 1, 2, ' - ']])}</p>
                        <p>{singleLineMultiFieldValueFormatter([tf, cotf], [true], null, [' ', ['(', ')']])}</p>
                        <p>{singleLineMultiFieldValueFormatter([pofr, copofr], [true], null, [' ', ['(', ')']])}</p>
                        <p>{singleLineMultiFieldValueFormatter([tc], [true], null, null)}</p>
                    </div>
                    break;
                }
                case 'research_disciplines':
                    formattedValue = <p>{reftableValueParser(rd.val).map((val, index) => {
                        return reftableValueFormatter(val, index, true)
                    })}</p>
                    break;
                case 'areas_of_research':
                    formattedValue = <p>{reftableValueParser(aor.val).map((val, index) => {
                        return reftableValueFormatter(val, index, true)
                    })}</p>
                    break;
                case 'fields_of_application':
                    formattedValue = <p>{reftableValueParser(foa.val).map((val, index) => {
                        return reftableValueFormatter(val, index, true)
                    })}</p>
                    break;
                case 'other_investigators':
                    formattedValue =
                        <p>{singleLineMultiFieldValueFormatter([ina, ro], null, null, [' ', ['(', ')']])}</p>;
                    break;
                default:
                    formattedValue = <p>{JSON.stringify(props.rawData)}</p>
                    break;
            }
            return formattedValue
        } else {
            return (
                <React.Fragment>
                    {JSON.stringify(props.rawData)}
                </React.Fragment>
            )
        }
    }
}