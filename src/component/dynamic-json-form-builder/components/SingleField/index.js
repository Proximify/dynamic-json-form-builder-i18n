import React, {useState} from 'react';
import './SingleField.css'
import NumberFormat from "react-number-format";

const handleValueChange = (value, rawErrors, setValue, onChange) => {
    if (!rawErrors || rawErrors.length === 0) {
        setValue(value);
    } else {
        setValue(value);
        onChange(value ?? undefined)
    }
}

export function StringInputWidget(props) {
    const [value, setValue] = useState(props.value ?? undefined);
    return (
        <input
            className={"singleFieldInput"}
            type={"text"}
            id={props.schema.id}
            value={value}
            required={props.required}
            onChange={event => handleValueChange(event.target.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value)}
        />
    );
}

export function NumberInputWidget(props) {
    const [value, setValue] = useState(props.value ?? undefined);
    return (
        <NumberFormat
            className={"singleFieldInput"}
            type="text"
            id={props.schema.id}
            value={value}
            thousandSeparator={false}
            onValueChange={value => handleValueChange(value.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value)}
        />
    );
}

export function PhoneInputWidget(props) {
    const [value, setValue] = useState(props.value ?? undefined);
    return (
        <NumberFormat
            className={"singleFieldInput"}
            type="text"
            id={props.schema.id}
            value={value}
            format={"+# (###) ###-####"}
            mask={"_"}
            onValueChange={value => handleValueChange(value.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value)}
        />
    );
}
