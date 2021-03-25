import React from "react";
import {FieldValueMapper, FormatterTracker, any, singleLineMultiFieldValueFormatter} from "../../../utils/helper";

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
                    {singleLineMultiFieldValueFormatter([pt, cc, ac, tn, ex, tsd, ted], null, ['s'], [': ', ['+', ' '], ['(', ') '], ' ', ['x ', ' ']],[[4,5,6,'| ('],[5,5,6,' - '],[6,5,6,')']])}
                </p>}
                {Object.keys(ft.getUnformattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnformattedField())}</p> : null
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