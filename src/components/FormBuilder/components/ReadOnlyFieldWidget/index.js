import React from "react";

export default function ReadOnlyFieldWidget(props) {
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