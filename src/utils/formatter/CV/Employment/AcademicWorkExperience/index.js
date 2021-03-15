import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function AcademicWorkExperience(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            position_type: pty,
            position_title: pti,
            position_status: ps,
            academic_rank: ar,
            start_date: sd,
            end_date: ed,
            work_description: wd,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            department: de,
            faculty_school_campus: fsc,
            tenure_status: ts,
            tenure_start_date: tsd,
            tenure_end_date: ted,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa,
        } = ft.getFields();
        return (
            <div>
                {any(pty, pti, ps, sd, ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([pty, pti, ps, sd, ed], null, ['s', 's', 's', 's', 's'], [', ', ', '], [[2, 3, 4,
                        <strong> (</strong>], [3, 3, 4, <strong> - </strong>], [4, 3, 4, <strong>)</strong>]])}
                </p>}
                {any(ar, ts, tsd, ted) &&
                <p>
                    {singleLineMultiFieldValueFormatter([ar, ts, tsd, ted], null, null, [', '], [[1, 2, 3, ' ('], [2, 2, 3, ' - '], [3, 2, 3, ')']])}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {otori.val && <span>{otori.val}{otorit.val && ', '}</span>}
                    {otorit.val && <span>{otorit.val}{otoril.val && ', '}</span>}
                    {otoril.val && <span>{otoril.val}</span>}
                </p>}
                {any(fsc) && <p>{fsc.val}</p>}
                {any(de) && <p>{de.val}</p>}
                {any(wd) && <>
                    {wd.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{wd.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: wd.val.eng}}/>
                    </div>}
                    {wd.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{wd.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: wd.val.fre}}/>
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
                </div>
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            research_discipline: rd,
            area_of_research: aor,
            field_of_application: foa
        } = ft.getFields();

        if (subsection) {
            let formattedValue = null;
            switch (subsection) {
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
                default:
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