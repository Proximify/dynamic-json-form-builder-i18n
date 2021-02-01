import React from "react";
import {FieldValueMapper, FormatterTracker} from "../../utils/helper";


export default function Recognitions(props) {
    // console.log("Recognitions", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        return (
            <div className="border border-red-300 m-2 rounded">
                {/*{ft.contains("converted_amount") ?*/}
                {/*    <p>{ft.getLabel("converted_amount")}{ft.getValue("converted_amount")}</p> : null}*/}
                {/*{ft.contains("organization") ?*/}
                {/*    <p>{ft.getLabel("organization")}{ft.getValue("organization")}</p> : null}*/}
                {/*{ft.contains("recognition_type") ? <p>{ft.getLabel("recognition_type")}: {ft.getValue("recognition_type")}</p> : null}*/}
                {/*{Object.keys(ft.getUnFormattedValue()).length > 0 ?*/}
                {/*    <p>{JSON.stringify(ft.getUnFormattedValue())}</p> : null*/}
                {/*}*/}
                Recognitions
            </div>
        )
    } else {
        return (
            <React.Fragment>
                Recognitions
            </React.Fragment>
        )
    }
}