import React, {useEffect, useState} from "react";
import {tw} from "twind";
import {TextAreaInputStyle} from "../utils/twindClass";
import TextareaAutosize from "react-textarea-autosize";


export default function ReadOnlyFieldWidget(props) {
        console.log("ReadOnlyFieldWidget", props);

    const [value, setValue] = useState(props.value && props.value!== "NaN" ? props.value : "0");
    // useEffect(() => {
    //     console.log("props update", props);
    //     setValue(props.value);
    // }, [props, props.value])
    return (
        <TextareaAutosize
            minRows={1}
            readOnly={true}
            id={props.schema.id}
            value={props.formContext.total}
            className={tw`${TextAreaInputStyle} bg-gray-200`}
        />
    );
}