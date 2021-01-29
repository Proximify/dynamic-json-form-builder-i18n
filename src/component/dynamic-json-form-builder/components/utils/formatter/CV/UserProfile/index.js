import React from "react";
import {FieldValueMapper, FormatterTracker} from "../../utils/helper";

export default function UserProfile(props) {
    // console.log("UserProfile", props);
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        console.log(mappedValue)
        const ft = new FormatterTracker(mappedValue);
        return (
            <div className="border border-red-300 m-2 rounded">
                {ft.contains("countries") ?
                    <p>{ft.getLabel("countries")}{ft.getValue("countries")}</p> : null}
                {ft.contains("key_theory_methodology") ?
                    <p>{ft.getLabel("key_theory_methodology")}{ft.getValue("key_theory_methodology")}</p> : null}
                {ft.contains("research_interests") ? <p>{ft.getLabel("research_interests")}: {ft.getValue("research_interests")}</p> : null}
                {ft.contains("researcher_status") ? <p>{ft.getLabel("researcher_status")}: {ft.getValue("researcher_status")}</p> : null}
                {Object.keys(ft.getUnFormattedValue()).length > 0 ?
                    <p>{JSON.stringify(ft.getUnFormattedValue())}</p> : null
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                UserProfile
            </React.Fragment>
        )
    }
}