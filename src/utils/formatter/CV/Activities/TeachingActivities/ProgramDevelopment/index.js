import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter
} from "../../../../utils/helper";

export default function ProgramDevelopment(props) {
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
            role: ro,
            program_title: pt,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            program_description: pd,
            department: dp,
            unique_innovative_characteristics: uic,
            course_level: cl,
            'co-developers': cd,
            date_first_taught: dft,
        } = ft.getFields();

        return (
            <div>
                {any(ro) && <p><strong>{ro.val}</strong></p>}
                {any(pt) && <p><strong>{pt.val}</strong></p>}
                {any(ori) && <p>{reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}</p>}
                {any(pd) && <>
                    {pd.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{pd.lbl}</p>
                        <p>{pd.val.eng}</p>
                    </div>}
                    {pd.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{pd.lbl} (French)</p>
                        <p>{pd.val.fre}</p>
                    </div>}
                </>}
                {any(dp) && <p>{dp.val}</p>}
                {any(uic) && <>
                    {uic.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{uic.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: uic.val.eng}}/>
                    </div>}
                    {uic.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{uic.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: uic.val.fre}}/>
                    </div>}
                </>}
                <div className="viewModeSubsection">
                    {any(cl) && <div><p>{cl.lbl}: </p><p>{cl.val}</p></div>}
                    {any(cd) &&
                    <div><p>{cd.lbl}: </p> <p>{cd.val.map((val, index) => {
                        return <span key={index}>
                                <span>{val.first_name} {val.family_name}</span>
                            </span>
                    })}</p></div>}
                    {any(dft) && <div><p>{dft.lbl}: </p><p>{dft.val}</p></div>}
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