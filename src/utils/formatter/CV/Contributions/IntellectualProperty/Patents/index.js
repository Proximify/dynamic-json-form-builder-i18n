import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function Patents(props) {
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
            patent_title: pt,
            patent_number:pn,
            patent_location:pl,
            patent_status:ps,
            filing_date:fd,
            date_issued:di,
            date_of_end_term:doet,
            inventors:inv,
            url: u,
            description_contribution_value_impact: dcvi,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(pt, pn, pl, ps) && <p>
                    {singleLineMultiFieldValueFormatter([pt, pn, pl, ps], null, ['s'], [', ', ', ', ', '])}
                </p>}
                {any(fd,di,doet) && <p>
                    ({singleLineMultiFieldValueFormatter([fd,di,doet], [true,true,true], null, [' - ', ' - '])})
                </p>}
                {any(u) && <p>
                    {<a href={u} className="text-blue-500 hover:underline">{u.val}</a>}
                </p>}
                {any(inv) && <p>{inv.lbl}: {inv.val}</p>}
                {any(dcvi) && <>
                    {dcvi.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{dcvi.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: dcvi.val.eng}}/>
                    </div>}
                    {dcvi.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{dcvi.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: dcvi.val.fre}}/>
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