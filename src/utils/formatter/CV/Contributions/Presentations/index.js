import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function Presentations(props) {
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
            presentation_title: pt,
            presentation_date: pd,
            conference_event_name: cen,
            location: lo,
            city: ci,
            main_audience: ma,
            invited: inv,
            keynote: ke,
            competitive: co,
            description_contribution_value: dcv,
            url: u,
            'co-presenters': cp,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(pt, pd) && <p>
                    {singleLineMultiFieldValueFormatter([pt, pd], null, ['s'], ['', [' (',')']])}
                </p>}
                {any(cen) && <p>{cen.val}</p>}
                {any(lo, ci) && <p>
                    {singleLineMultiFieldValueFormatter([lo,ci], null, null, [' '])}
                </p>}
                {any(ma) && <p>{ma.lbl}: {ma.val}</p>}
                {any(inv, ke, co) && <p>
                    {singleLineMultiFieldValueFormatter([inv, ke, co], null, null, [', ', ', '])}
                </p>}
                {any(dcv) && <>
                    {dcv.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{dcv.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.eng}}/>
                    </div>}
                    {dcv.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{dcv.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: dcv.val.fre}}/>
                    </div>}
                </>}
                {any(u) && <p>
                    <a href={u} className="text-blue-500 hover:underline"> {u.val}</a>
                </p>}
                <div className="viewModeSubsection">
                    {any(cp) && <div><p>{cp.lbl}: </p><p>{cp.val}</p></div>}
                    {any(fs) &&
                    <div><p>{fs.lbl}</p>
                        <div>{fs.val.map((val, index) => {
                            return <div key={index}>
                                <p>{singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization, val.funding_reference_number], [false, false, true], null, null, [[1,2,2,' ('], [2,2,2,')']])}</p>
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
                CourseTaught
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}