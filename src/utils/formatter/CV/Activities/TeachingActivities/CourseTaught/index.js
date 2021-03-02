import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter
} from "../../../../utils/helper";

export default function CourseTaught(props) {
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
            course_code: cc,
            academic_session: as,
            start_date: sd,
            end_date: ed,
            course_title: cti,
            guest_lecture: gl,
            department: dp,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            course_level: cl,
            course_topic: cto,
            section: sec,
            number_of_students: nos,
            number_of_credits: noc,
            lecture_hours_per_week: lehpw,
            lab_hours_per_week: lahpw,
            tutorial_hours_per_week: thpw,
            'co-instructors': ci
        } = ft.getFields();

        return (
            <div>
                {any(ro, cc, as, sd, ed) &&
                <p>
                    {ro.val && <strong>{ro.val}, </strong>}
                    {cc.val && <span>{cc.val}, </span>}
                    {as.val && <span>{as.val} </span>}
                    {any(sd, ed) && <span>({sd.val} - {ed.val})</span>}
                </p>}
                {any(cti, gl) &&
                <p>
                    {cti.val && <span>{cti.val}</span>}
                    {gl.val && <span> ({gl.val})</span>}
                </p>}
                {any(dp, ori) && <p>{dp.val && <span>{dp.val}{ori.val && ', '}</span>}
                    {reftableValueParser(ori.val, false, true).map((val, index) => {
                        return reftableValueFormatter(val, index)
                    })}</p>}
                {any(cl,cto) && <p>{cl.val && <span>{cl.val}{cto.val && ', '}</span>}{cto.val && <span>{cto.val}</span>}</p>}
                {any(sec) && <p>{sec.lbl}: {sec.val}</p>}
                {any(nos, noc) && <p><span>{nos.lbl}: {nos.val}{noc.val && ', '}</span><span>{noc.lbl}: {noc.val}</span></p>}
                {any(nos, noc) && <p><span>{nos.lbl}: {nos.val}{noc.val && ', '}</span><span>{noc.lbl}: {noc.val}</span></p>}
                {any(lehpw, lahpw, thpw) && <p><span>{lehpw.lbl}: {lehpw.val}{any(lahpw, thpw) && ', '}</span><span>{lahpw.lbl}: {lahpw.val}{thpw.val && ', '}</span><span>{thpw.lbl}: {thpw.val}</span></p>}
                {any(ci) &&
                <div><p><strong>{ci.lbl}: </strong></p> <p>{ci.val.map((val, index) => {
                    return <span key={index}>
                            <span>{val.first_name} {val.family_name}</span>
                        </span>
                })}</p></div>}
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
                CourseTaught
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}