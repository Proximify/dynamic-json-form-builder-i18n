import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    any,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function ContinuousProfessionalDevelopment(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);

        const {
            title_position: tp,
            subject:su,
            start_date: sd,
            end_date: ed,
            department:dp,
            supervisor:sup,
            organization: ori,
            other_organization: otori,
            other_organization_location: otoril,
            description: desc,
        } = ft.getFields();
        return (
            <div>
                {any(tp,su,sd,ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([tp,su,sd,ed], null, ['s'], [', ', ' '],[[1,2,3,'('],[2,2,3,' - '],[3,2,3,')']])}
                </p>}
                {any(dp,sup) &&
                <p>
                    {singleLineMultiFieldValueFormatter([dp,sup], null, null, [', '])}
                </p>}
                {any(ori, otori, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {otori.val && <span>{otori.val}{otori.val && ', '}</span>}
                    {otoril.val && <span>{otoril.val}</span>}
                </p>}
                {any(desc) && <>
                    {desc.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{desc.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: desc.val.eng}}/>
                    </div>}
                    {desc.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{desc.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: desc.val.fre}}/>
                    </div>}
                </>}
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                ContinuousProfessionalDevelopment
                {/*{props.structureChain[0] in subsections ? subsections[props.structureChain.shift()] : JSON.stringify(props.rawData)}*/}
            </React.Fragment>
        )
    }
}