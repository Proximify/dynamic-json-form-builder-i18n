import React from "react";
import {any, FieldValueMapper, FormatterTracker} from "../../../../utils/helper";

export default function CountryOfCitizenship(props) {
    //console.log("CountryOfCitizenship", props)

    const {rawData, schema} = props;

    // console.log(rawData, schema)
    const mappedValue = FieldValueMapper(rawData, schema, true);
    // console.log(mappedValue);
    const ft = new FormatterTracker(mappedValue);

    const {
        country_of_citizenship: coc
    } = ft.getFields();

    return (
        <div>
            {any(coc) &&
            <p>{coc.lbl}: {coc.val}</p>}
            {Object.keys(ft.getUnFormattedField()).length > 0 ?
                <p>{JSON.stringify(ft.getUnFormattedField())}</p> : null
            }
            {/*{JSON.stringify(rawData)}*/}
        </div>
    )
}