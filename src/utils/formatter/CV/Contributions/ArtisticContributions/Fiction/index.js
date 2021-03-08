import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function Fiction(props) {
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
            short_fiction_title:sft,
            appeared_in:ai,
            volume:vo,
            issue:is,
            page_range:pr,
            publication_date:pd,
            publisher:pub,
            publication_location:pl,
            description_contribution_value: dcv,
            url: u,
            contribution_role: cr,
            number_of_contributors: noc,
            authors: au,
            editors: ed,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(sft, ai, vo, is, pr, pd) && <p>
                    {singleLineMultiFieldValueFormatter([sft, ai, vo, is, pr, pd], [false, false, true, true, true], ['s'], [', ', ', ', ', ', ', ', ' ',['(',')']])}
                </p>}
                {any(pub, pl) && <p>
                    {singleLineMultiFieldValueFormatter([pub, pl], null, ['i'], [' '])}
                </p>}
                {any(u) && <p>
                    {<a href={u} className="text-blue-500 hover:underline">{u.val}</a>}
                </p>}
                {any(cr) && <p><strong>{cr.val}</strong></p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
                {any(au) && <p><strong>{au.lbl}</strong>: {au.val}</p>}
                {any(ed) && <p><strong>{ed.lbl}</strong>: {ed.val}</p>}
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
                    <div>{fs.val.map((val, index) => {
                        return <div key={index}>
                            <p>{singleLineMultiFieldValueFormatter([val.funding_organization, val.other_funding_organization, val.funding_reference_number], [false, false, true], null, null, [[1, 2, 2, ' ('], [2, 2, 2, ')']])}</p>
                        </div>
                    })}</div>
                </div>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                NewspaperArticles
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}