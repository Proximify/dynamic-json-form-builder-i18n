import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter
} from "../../../../utils/helper";

export default function CourseDevelopment(props) {
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
            department: dp,
            course_title: cti,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            course_level: cl,
            'co-developers': cd,
            date_first_taught: dft,
            course_description: cdesc,
        } = ft.getFields();

        return (
            <div>
                {any(ro, dp) &&
                <p>
                    {ro.val && <strong>{ro.val}{dp.val && ', '}</strong>}
                    {dp.val && <span>{dp.val} </span>}
                </p>}
                {any(cti) && <p>
                    {cti.val && <span>{cti.val}</span>}</p>}

                {any(ori) && <p>{reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}</p>}
                {any(cl) && <p>{cl.lbl}: {cl.val}</p>}
                {any(cd) &&
                <div><p>{cd.lbl}: </p> <p>{cd.val.map((val, index) => {
                    return <span key={index}>
                            <span>{val.first_name} {val.family_name}</span>
                        </span>
                })}</p></div>}
                {any(dft) && <p>{dft.lbl}: {dft.val}</p>}
                {any(cdesc) && <>
                    {cdesc.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{cdesc.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: cdesc.val.eng}}/>
                    </div>}
                    {cdesc.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{cdesc.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: cdesc.val.fre}}/>
                    </div>}
                </>}
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