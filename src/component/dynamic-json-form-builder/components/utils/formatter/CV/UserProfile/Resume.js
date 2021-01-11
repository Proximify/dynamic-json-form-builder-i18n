import React from "react";

export default function Resume(props) {
    console.log("Resume", props)

    return (
        <React.Fragment>
            {props.values ? <i>{props.values}</i> : null}
        </React.Fragment>
    )
}