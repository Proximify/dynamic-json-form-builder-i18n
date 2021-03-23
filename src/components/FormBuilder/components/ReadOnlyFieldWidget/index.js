import React from "react";
import '../SingleField/SingleField.css'

export default function ReadOnlyFieldWidget(props) {
    // console.log(props)
    return (
        <input
            className={"singleFieldInput bg-gray-200"}
            type={"text"}
            readOnly={true}
            id={props.schema.id}
            value={props.value}
        />
    );
}