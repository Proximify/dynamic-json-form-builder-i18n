import React from 'react';
import WindowedSelect, {components} from "react-windowed-select";
import {
    MultiColWindowedSelectStyle,
    MultiColWindowedSelectMenuItem,
    MultiColWindowedSelectValueContainer,
    WindowedSelectStyle
} from "../utils/twindClass";
import {tw} from "twind";

const handleChange = (value, onChange) => {
    onChange(!value ? undefined : JSON.stringify(value.value))
}

export function SingleLargeSelectionWidget(props) {
    const {value} = props;
    const lovOptions = props.formContext.lovOptions[props.schema.subtype_id].map(opt => {
        return {label: opt.toString(), value: opt}
    });
    const lovValue = value ? JSON.parse(value) : undefined;
    return (
        <WindowedSelect
            className={tw`${WindowedSelectStyle}`}
            classNamePrefix="react-select"
            id={props.schema.id}
            getOptionLabel={option => option.value[1] ?? option.label}
            options={lovOptions}
            defaultValue={lovValue ?
                lovOptions[lovOptions.map(element =>
                    element.value.toString()
                ).indexOf(lovValue.toString())]
                : null}
            onChange={value => handleChange(value, props.onChange)}
            isClearable={true}
        />);
}

export function MultiColLargeSelectionWidget(props) {
    const {value} = props;
    const lovOptions = props.formContext.lovOptions[props.schema.subtype_id].map(opt => {
        return {label: opt.toString(), value: opt}
    });
    const lovValue = value ? JSON.parse(value) : undefined;

    const formatOptionLabel = ({label, value}) => (
        <table className={tw`w-full border-b`}>
            <tbody>
            <tr className={tw`flex`}>
                {
                    value.map((val, index) => {
                        return index > 0 &&
                            <MultiColWindowedSelectMenuItem
                                key={index}
                                size={value.length - 1}>{val}
                            </MultiColWindowedSelectMenuItem>
                    })
                }
            </tr>
            </tbody>
        </table>
    );

    const SingleValue = ({children, ...props}) => {
        const value = [...props.data.value];
        value.shift();
        return (<MultiColWindowedSelectValueContainer numOfCol={value.length - 1}>
            <components.SingleValue {...props}>
                {value.map((val, index) => {
                    return <p key={index} className={tw`overflow-scroll`}>{val}</p>
                })}
            </components.SingleValue>
        </MultiColWindowedSelectValueContainer>)
    };

    return (
        <WindowedSelect
            className={tw`${MultiColWindowedSelectStyle}`}
            classNamePrefix="react-select"
            id={props.schema.id}
            components={{SingleValue}}
            options={lovOptions}
            onChange={value => handleChange(value, props.onChange)}
            defaultValue={lovValue ?
                lovOptions[lovOptions.map(element =>
                    element.value.toString()
                ).indexOf(lovValue.toString())]
                : null}
            formatOptionLabel={formatOptionLabel}
            isClearable={true}
        />
    );
}