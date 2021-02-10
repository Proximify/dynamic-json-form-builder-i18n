import React from "react";

export default function HiddenFieldTemplate(props) {
    const {children, rawErrors} = props;
    console.log("hiddenFieldWidget" , children)

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}