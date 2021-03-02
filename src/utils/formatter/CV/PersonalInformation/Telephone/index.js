import React from "react";
import {FieldValueMapper, FormatterTracker, any} from "../../../utils/helper";

export default function Telephone(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            phone_type: pt,
            country_code: cc,
            area_code: ac,
            telephone_number: tn,
            extension: ex,
            telephone_start_date: tsd,
            telephone_end_date: ted
        } = ft.getFields();

        return (
            <div>
                {any(pt, cc, ac, tn, ex, tsd, ted) &&
                <p>
                    <>{pt.val &&
                    <strong>{`${pt.val}: `}</strong>}{cc.val && `+${cc.val} `}{ac.val && `(${ac.val}) `}{tn.val}{ex.val && `x ${ex.val} `}</>
                    {any(tsd, ted) && <span>| ({tsd.val} - {ted.val})</span>}
                </p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                LanguageSkill
            </React.Fragment>
        )
    }
}