import React from "react";
import {any, FieldValueMapper, FormatterTracker, reftableValueParser, reftableValueFormatter} from "../../utils/helper";
import ResearchDisciplines from "./ResearchDisciplines";
import AreaOfResearch from "./AreaOfResearch";
import FieldsOfApplication from "./FieldOfAppliance";


export default function Recognitions(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    const subsections = {
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
    }

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            recognition_type: rt,
            recognition_name: rn,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            effective_date: efd,
            end_date: end,
            "amount_(can$)": amc,
            amount: am,
            description: desc,
            currency: cur,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa,
            converted_amount: ca
        } = ft.getFields();

        return (
            <div>
                {any(rt, rn) &&
                <p>
                    <strong>{rt.val} </strong>
                    {rn.val && <i>{rn.val}</i>}
                </p>}
                {any(efd, end, ori, otori, otorit, otoril) &&
                <p>
                    {any(efd, end) && <span>{`(${efd.val} - ${end.val})`} </span>}
                    <span>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                        return reftableValueFormatter(val, index)
                    })}
                        {otori.val && <span>{otori.val}{otorit.val && ', '}</span>}
                        {otorit.val && <span>{otorit.val}{otoril.val && ', '}</span>}
                        {otoril.val && <span>{otoril.val}</span>}
                    </span>
                </p>}
                {any(am, cur, amc) && <p>{am.val && `${am.lbl}: ${am.val} ${cur.val} ${amc.val}`}</p>}
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
                {any(ca) && <p>{ca.lbl}: {ca.val}</p>}
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