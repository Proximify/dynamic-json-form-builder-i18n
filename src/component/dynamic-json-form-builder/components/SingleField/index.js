import React, {useState} from 'react';
import './SingleField.css'
import NumberFormat from "react-number-format";

const SingleFieldWidget = (props) => {
    const {schema} = props;
    const [value, setValue] = useState(props.value ?? "");
    // console.log("TextInputWidget", props);

    const handleTextChange = (event) => {
        console.log(event.target.value)
        if (!props.rawErrors || props.rawErrors.length === 0) {
            setValue(event.target.value);
        } else {
            setValue(event.target.value);
            props.onChange(event.target.value ?? undefined)
        }
    }

    const handleNumChange = (value) => {
        if (!props.rawErrors || props.rawErrors.length === 0) {
            setValue(value.value);
        } else {
            setValue(value.value);
            props.onChange(value.value ?? undefined)
        }
    }

    const handleBlur = () => {
        props.onChange(value)
    }

    if (schema.hasOwnProperty("type") && schema.type === "integer") {
        if (schema.hasOwnProperty("style") && schema.style === "phoneNumField") {
            return (
                    <NumberFormat
                        className={"singleFieldInput"}
                        type="text"
                        id={props.schema.id}
                        value={value}
                        format={"+# (###) ###-####"}
                        mask={"_"}
                        onValueChange={handleNumChange}
                        onBlur={handleBlur}
                    />
            );
        } else {
            return (
                    <NumberFormat
                        className={"singleFieldInput"}
                        type="text"
                        id={props.schema.id}
                        value={value}
                        thousandSeparator={true}
                        onValueChange={handleNumChange}
                        onBlur={handleBlur}
                    />
            );
        }
    } else {
        return (
                <input
                    className={"singleFieldInput"}
                    type={"text"}
                    id={props.schema.id}
                    value={value}
                    required={props.required}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                />
        );
    }
}

export default SingleFieldWidget;