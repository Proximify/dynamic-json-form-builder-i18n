import React from "react";
import {tw} from "twind";
import {TextAreaInputStyle} from "../utils/twindClass";
import TextareaAutosize from "react-textarea-autosize";


export default function ReadOnlyFieldWidget(props) {
    return (
        <TextareaAutosize
            minRows={1}
            readOnly={true}
            id={props.schema.id}
            value={props.value}
            className={tw`${TextAreaInputStyle} bg-gray-200`}
        />
    );
}