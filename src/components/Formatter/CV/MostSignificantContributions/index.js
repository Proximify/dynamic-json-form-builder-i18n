import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker, reftableValueFormatter,
    reftableValueParser,
    singleLineMultiFieldValueFormatter
} from "../../utils/helper";

export default function MostSignificantContributions(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;


    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            title: ti,
            contribution_date: cd,
            description_contribution_value_impact: dcvi
        } = ft.getFields();

        return (
            <div>
                {any(ti) && <>
                    {ti.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{ti.lbl}</p>
                        <p dangerouslySetInnerHTML={{__html: ti.val.eng}}/>
                    </div>}
                    {ti.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{ti.lbl} (French)</p>
                        <p dangerouslySetInnerHTML={{__html: ti.val.fre}}/>
                    </div>}
                </>}
                {any(cd) && <p>({cd.val})</p>}
                {any(dcvi) && <>
                    {dcvi.val.eng && <div className="bilingualItem">
                        <p className="mainValue">{dcvi.lbl}</p>
                        <p>{dcvi.val.eng}</p>
                    </div>}
                    {dcvi.val.fre && <div className="bilingualItem">
                        <p className="mainValue">{dcvi.lbl} (French)</p>
                        <p>{dcvi.val.fre}</p>
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
                MostSignificantContributions
            </React.Fragment>
        )
    }
}