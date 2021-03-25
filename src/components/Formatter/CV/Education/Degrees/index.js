import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    any,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

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
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
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
        return (
            <div>
                {any(dt, dsd, drd, ded) &&
                <p>
                    {singleLineMultiFieldValueFormatter([dt, dsd, drd, ded], null, ['s'], [' '], [[0, 1, 3, ' ('], [1, 1, 3, ' - '], [3, 1, 3, ')']])}
                </p>}
                {any(dn, spe, ds) && <p>
                    {dn.val && <>{dn.val.eng} {dn.val.fre &&
                    <span className="secondLang">{`(${dn.val.fre})`}</span>}</>}
                    {spe.val && <>, {spe.val.eng} {spe.val.fre &&
                    <span className="secondLang">{`(${spe.val.fre})`}</span>}</>}
                    {ds.val && <span> ({ds.val})</span>}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {otori.val && <span>{otori.val}{otori.val && ', '}</span>}
                    {otorit.val && <span>{otorit.val}{otorit.val && ', '}</span>}
                    {otoril.val && <span>{otoril.val}</span>}
                </p>}
                {any(tt) && <p>{tt.val}</p>}
                {any(ttpwcm) && <p>{ttpwcm.val}</p>}
                <div className="viewModeSubsection">
                    {any(sup) &&
                    <div><p>{sup.lbl}</p> <p>{sup.val.map((val, index) => {
                        return <span key={index}>
                            {singleLineMultiFieldValueFormatter([val.supervisor_name, val.start_date, val.end_date], null, null, [' '], [[0, 1, 2, ' ('], [1, 1, 2, ' - '], [2, 1, 2, ')']])}
                            {index < sup.val.length - 1 && ', '}
                        </span>
                    })}</p></div>}
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
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            supervisor_name: sn,
            start_date: sd,
            end_date: ed,
            research_discipline: rd,
            area_of_research: aor,
            field_of_application: foa
        } = ft.getFields();
        if (subsection) {
            let formattedValue = null;
            switch (subsection) {
                case 'supervisors':
                    formattedValue =
                        <p>{singleLineMultiFieldValueFormatter([sn, sd, ed], null, null, [' '], [[0, 1, 2, ' ('], [1, 1, 2, ' - '], [2, 1, 2, ')']])}</p>;
                    break;
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