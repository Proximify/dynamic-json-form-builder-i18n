import React from "react";
import AllReference from './AllReference';

export default function RMFormatter(props) {
    const forms = {
        "AllReference": <AllReference/>
    }

    return (
        <div>
            This is All Reference Form belongs to RM app
            {forms[props.form]}
        </div>
    )
}