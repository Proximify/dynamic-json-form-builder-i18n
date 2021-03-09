import React from "react";

export default function HiddenFieldTemplate(props) {
    const {children} = props;

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}