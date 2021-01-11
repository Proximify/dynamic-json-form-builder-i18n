import React from "react";
import Source from './Source';

export default function AllReference(props) {
    console.log("display",props);

    const subSectionIDs = {
        "source": <Source fields={props.fields} values={props.values}/>,

    }

    return (
        <div>
            {subSectionIDs[props.section]}
        </div>
    )
}