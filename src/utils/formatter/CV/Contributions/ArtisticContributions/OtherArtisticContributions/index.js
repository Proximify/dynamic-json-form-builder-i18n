import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../../utils/helper";

export default function OtherArtisticContributions(props) {
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
            title: ti,
            venue: ve,
            date: da,
            number_of_contributors: noc,
            url: u,
            contribution_role: cr,
            description_contribution_value: dcv,
            funding_sources: fs
        } = ft.getFields();

        return (
            <div>
                {any(ti) && <>
                    {ti.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ti.lbl}</p>
                        <p><strong>{ti.val.eng}</strong></p>
                    </div>}
                    {ti.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ti.lbl} (French)</p>
                        <p><strong>{ti.val.fre}</strong></p>
                    </div>}
                </>}
                {any(ve, da) && <p>
                    {singleLineMultiFieldValueFormatter([ve, da], null, null, [', ', ['(', ')']])}
                </p>}
                {any(u) && <p>
                    {<a href={u} className="text-blue-500 hover:underline">{u.val}</a>}
                </p>}
                {any(noc) && <p>{noc.lbl}: {noc.val}</p>}
                {any(cr) && <>
                    {cr.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{cr.lbl}</p>
                        <p>{cr.val.eng}</p>
                    </div>}
                    {cr.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{cr.lbl} (French)</p>
                        <p>{cr.val.fre}</p>
                    </div>}
                </>}
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
    } else {
        return (
            <React.Fragment>
                NewspaperArticles
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}