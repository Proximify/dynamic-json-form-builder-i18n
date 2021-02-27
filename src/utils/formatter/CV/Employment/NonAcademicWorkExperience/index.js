import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter
} from "../../../utils/helper";

export default function NonAcademicWorkExperience(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    const subsections = {
        // "research_disciplines": <ResearchDisciplines structureChain={props.structureChain}
        //                                              isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                              rawData={props.rawData}/>,
        // "areas_of_research": <AreaOfResearch structureChain={props.structureChain}
        //                                      isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                      rawData={props.rawData}/>,
        // "fields_of_application": <FieldsOfApplication structureChain={props.structureChain}
        //                                               isFullScreenViewMode={props.isFullScreenViewMode} schema={props.schema}
        //                                               rawData={props.rawData}/>,
    }

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            position_title: pti,
            position_status: ps,
            start_date: sd,
            end_date: ed,
            work_description: wd,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            unit_division:ud,
            research_disciplines: rd,
            areas_of_research: aor,
            fields_of_application: foa,
        } = ft.getFields();
        return (
            <div>
                {any(pti, ps, sd, ed) &&
                <p>
                    {pti.val && <strong>{pti.val}, </strong>}
                    {ps.val && <strong>{ps.val} </strong>}
                    {any(sd, ed) && <strong>({sd.val} - {ed.val})</strong>}
                </p>}
                {any(ori) && <span>{reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}</span>}
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
                {any(ud) && <p>{ud.val}</p>}
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
    }
    else
    {
        return (
            <React.Fragment>
                awe
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}