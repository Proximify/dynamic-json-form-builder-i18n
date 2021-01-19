import React, {useState} from 'react';
import Select from "react-select";
import WindowedSelect from "react-windowed-select";

const handleChange = (value, onChange) => {
    onChange(!value ? undefined : value.value)
}

export function SingleSelectionWidget(props) {
    const {options, value} = props;
    return (
        <Select
            id={props.schema.id}
            className={"singleFieldInput"}
            options={options.enumOptions}
            defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                return e.value;
            }).indexOf(value)]}
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
                {value.map((val, index) => {
                    return (
                        <td className={"w-25 p-1"} key={index}>{val}</td>
                    )
                })}
            </tr>
            </tbody>
        </table>
    );

    return (
        <Select
            className={"singleFieldInput"}
            id={props.schema.id}
            options={options.enumOptions}
            onChange={value => handleChange(value, props.onChange)}
            formatOptionLabel={formatOptionLabel}
            defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                return e.value.join('');
            }).indexOf((value) ? value.join('') : "")]}
            isClearable
        />
    );
}

export function SingleLargeSelectionWidget(props) {
    const {options, value} = props;
    return (
        <WindowedSelect
            id={props.schema.id}
            className={"singleFieldInput"}
            options={options.enumOptions}
            isClearable={true}
            onChange={value => handleChange(value, props.onChange)}
            defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                return e.value;
            }).indexOf(value)]}
        />
    );
}

export function MultiColLargeSelectionWidget(props) {
    const {options, value} = props;
    const formatOptionLabel = ({label, value}) => (
        <table className={"table"}>
            <tbody>
            <tr>
                {value.map((val, index) => {
                    return (
                        <td className={"w-25 p-1"} key={index}>{val}</td>
                    )
                })}
            </tr>
            </tbody>
        </table>
    );
    return (
        <WindowedSelect
            id={props.schema.id}
            className={"singleFieldInput"}
            options={options.enumOptions}
            onChange={value => handleChange(value, props.onChange)}
            defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                return e.value.join('');
            }).indexOf((value) ? value.join('') : "")]}
            formatOptionLabel={formatOptionLabel}
            isClearable={true}
        />
    );
}