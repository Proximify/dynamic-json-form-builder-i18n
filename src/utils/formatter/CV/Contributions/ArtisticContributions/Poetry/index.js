import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function Poetry(props) {
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
            title: pt,
            venue: ve,
            appeared_in: ai,
            volume: vo,
            issue: is,
            page_range: pr,
            date: da,
            publisher: pub,
            country: co,
            contribution_role: cr,
            number_of_contributors: noc,
            url: u,
            authors: au,
            editors: ed,
            description_contribution_value: dcv,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(pt, ve, ai, vo, is, pr, da) && <p>
                    {singleLineMultiFieldValueFormatter([pt, ve, ai, vo, is, pr, da], [false, false, false, true, true, true], ['s'], [', ', ', ', ', ', ', ', ', ', ' ', ['(', ')']])}
                </p>}
                {any(pub, co) && <p>
                    {singleLineMultiFieldValueFormatter([pub, co], null, null, [', '])}
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
                        <p>{dcv.val.eng}</p>
                    </div>}
                    {dcv.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{dcv.lbl} (French)</p>
                        <p>{dcv.val.fre}</p>
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
    }
else
    {
        return (
            <React.Fragment>
                NewspaperArticles
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}