import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function ExhibitionCatalogues(props) {
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
            catalogue_title: ct,
            gallery_publisher:gp,
            publication_date:pd,
            publication_location:pl,
            publication_city:pc,
            number_of_pages:nop,
            description_contribution_value: dcv,
            url: u,
            contribution_role: cr,
            artists:ar,
            contributors: co,
            number_of_contributors: noc,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(ct, gp, pd) && <p>
                    {singleLineMultiFieldValueFormatter([ct, gp, pd], null, ['s'], [', ', ' ', ['(',')']])}
                </p>}
                {any(pl, pc) && <p>
                    {singleLineMultiFieldValueFormatter([pl, pc], null, null, [', '])}
                </p>}
                {any(nop) && <p>{nop.lbl}: {nop.val}</p>}
                {any(u) && <p>
                    {<a href={u} className="text-blue-500 hover:underline">{u.val}</a>}
                </p>}
                {any(cr) && <p><strong>{cr.val}</strong></p>}
                {any(ar) && <p>{ar.lbl}: {ar.val}</p>}
                {any(co) && <p>{co.lbl}: {co.val}</p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
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
                {any(fs) &&
                <div><p><strong>{fs.lbl}</strong></p>
                    {fs.val.map((val, index) => {
                        return <p key={index}>
                            {singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization, val.funding_reference_number], [false, false, true], null, null, [[1, 2, 2, ' ('], [2, 2, 2, ')']])}
                        </p>
                    })}
                </div>}
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