import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    any,
    reftableValueParser,
    reftableValueFormatter
} from "../../../utils/helper";

export default function Credentials(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);

        const {
            title: ti,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            effective_date: efd,
            description: desc,
            end_date: end,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa
        } = ft.getFields();
        return (
            <div>
                {any(ti, efd, end) &&
                <p>
                    <strong>{ti.val} </strong>
                    {any(efd, end) && <span>({efd.val} - {end.val})</span>}
                </p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {otori.val && <span>{otori.val}{otorit.val && ', '}</span>}
                    {otorit.val && <span>{otorit.val}{otoril.val && ', '}</span>}
                    {otoril.val && <span>{otoril.val}</span>}
                </p>}
                {any(desc) && <>
                    {desc.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{desc.lbl}</p>
                        <p>{desc.val.eng}</p>
                    </div>}
                    {desc.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{desc.lbl} (French)</p>
                        <p>{desc.val.fre}</p>
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
        return (
            <React.Fragment>
                Credentials
            </React.Fragment>
        )
    }
}