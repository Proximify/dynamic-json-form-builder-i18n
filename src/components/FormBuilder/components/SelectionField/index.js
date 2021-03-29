import React, {useState, useEffect, useRef} from 'react';
import Select from "react-select";
import WindowedSelect, {components} from "react-windowed-select";
import './SelectionField.css'

const handleChange = (value, onChange) => {
    onChange(!value ? undefined : JSON.stringify(value.value))
}

export function SingleSelectionWidget(props) {
    const {options, value} = props;
    return (
        <Select
            id={props.schema.id}
            getOptionLabel={option => option.value[1] ?? option.label}
            className={"singleFieldSelect"}
            options={options.enumOptions}
            defaultValue={value ?
                options.enumOptions[options.enumOptions.map(element =>
                    element.value.toString()
                ).indexOf(value.toString())]
                : null}
            onChange={value => handleChange(value, props.onChange)}
            isClearable={true}
        />
    );
}

export function MultiColSelectionWidget(props) {
    const {options, value} = props;
    const formatOptionLabel = ({label, value}) => (
        <table className={"table"}>
            <tbody>
            <tr>
                {
                    value.map((val, index) => {
                        return index > 0 ?
                            <td className="w-40 p-1" key={index}>{val}</td>
                            : null
                    })
                }
            </tr>
            </tbody>
        </table>
    );

    return (
        <Select
            className={"singleFieldSelect"}
            id={props.schema.id}
            options={options.enumOptions}
            onChange={value => handleChange(value, props.onChange)}
            formatOptionLabel={formatOptionLabel}
            defaultValue={value ?
                options.enumOptions[options.enumOptions.map(element =>
                    element.value.toString()
                ).indexOf(value.toString())]
                : null}
            isClearable
        />
    );
}

export function SingleLargeSelectionWidget(props) {
    const {value} = props;
    const lovOptions = props.formContext.lovOptions[props.schema.subtype_id].map(opt => {
        return {label: opt.toString(), value: opt}
    });
    const lovValue = value ? JSON.parse(value) : undefined;
    return (
        <WindowedSelect id={props.schema.id}
                        getOptionLabel={option => option.value[1] ?? option.label}
                        className={"singleFieldSelect"}
                        options={lovOptions}
                        defaultValue={lovValue ?
                            lovOptions[lovOptions.map(element =>
                                element.value.toString()
                            ).indexOf(lovValue.toString())]
                            : null}
                        onChange={value => handleChange(value, props.onChange)}
                        isClearable={true}/>);
}

export function MultiColLargeSelectionWidget(props) {
    const {value} = props;
    const lovOptions = props.formContext.lovOptions[props.schema.subtype_id].map(opt => {
        return {label: opt.toString(), value: opt}
    });
    const lovValue = value ? JSON.parse(value) : undefined;

    const formatOptionLabel = ({label, value}) => (
        <table className={"table w-full border-b"}>
            <tbody>
            <tr className="flex">
                {
                    value.map((val, index) => {
                        return index > 0 &&
                            <td className={`w-1/${value.length - 1} flex-grow`} key={index}>{val}</td>
                    })
                }
            </tr>
            </tbody>
        </table>
    );

    const SingleValue = ({children, ...props}) => {
        const value = [...props.data.value];
        value.shift();
        return (<div className={`py-${3 * (value.length - 1)} my-1`}>
            <components.SingleValue {...props}>
                {value.map((val, index) => {
                    return <p key={index}>{val}</p>
                })}
            </components.SingleValue>
        </div>)

    };

    return (
        <WindowedSelect
            id={props.schema.id}
            components={{SingleValue}}
            className={"singleFieldSelect"}
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