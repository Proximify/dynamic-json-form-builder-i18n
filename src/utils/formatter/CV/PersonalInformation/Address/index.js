import React from "react";
import {
    FieldValueMapper,
    FormatterTracker,
    any,
    reftableValueParser,
    reftableValueFormatter, singleLineMultiFieldValueFormatter
} from "../../../utils/helper";

export default function Address(props) {
    // console.log("Address", props)
    const {rawData, schema} = props;
    const formData = rawData.values;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            address_type: at,
            "address_-_line_1": al1,
            line_2: l2,
            line_3: l3,
            line_4: l4,
            line_5: l5,
            city: ci,
            location: lo,
            postal_zip_code: pzc,
            address_start_date: asd,
            address_end_date: aed
        } = ft.getFields();

        return (
            <div>
                {/*TODO: Primary value?*/}
                {any(at, al1, asd, aed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([at, al1, asd, aed], null, ['s'], [': '],[[1,2,3,' ('],[2,2,3,' - '],[3,2,3,')']])}
                </p>}
                {any(l2) && <p>{l2.val}</p>}
                {any(l3) && <p>{l3.val}</p>}
                {any(l4) && <p>{l4.val}</p>}
                {any(l5) && <p>{l5.val}</p>}
                {any(ci, lo) && <p><span>{ci.val}</span>
                    {lo.val && <><span>, </span>
                        {reftableValueParser(lo.val, false, true).map((val, index) => {
                            return reftableValueFormatter(val, index)
                        })}
                    </>}</p>}
                {any(pzc) && <p>{pzc.val}</p>}
                {Object.keys(ft.getUnFormattedField()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                Address
            </React.Fragment>
        )
    }
}