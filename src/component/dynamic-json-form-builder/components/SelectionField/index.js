import React, {useState} from 'react';
import Select from "react-select";
import WindowedSelect from "react-windowed-select";

const SelectionFieldWidget = (props) => {
    const {options, value, schema} = props;
    console.log("SelectionFieldWidget", schema)
    const handleChange = (value) => {
        console.log("Selected!!", value);
        if (value === null) {
            props.onChange(undefined);
        } else {
            props.onChange(value.value);
        }
    }

    if (schema.hasOwnProperty("largeEnum") && schema.largeEnum) {
        if (schema.hasOwnProperty("multiCol") && schema.multiCol) {

        } else {
            return (
                    <WindowedSelect
                        id={props.schema.id}
                        className={"singleFieldInput"}
                        options={options.enumOptions}
                        isClearable={true}
                        onChange={handleChange}
                        defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                            return e.value;
                        }).indexOf(value)]}
                    />
            );
        }
    } else if (schema.hasOwnProperty("multiCol") && schema.multiCol) {
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
                    onChange={handleChange}
                    formatOptionLabel={formatOptionLabel}
                    defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                        return e.value.join('');
                    }).indexOf((value) ? value.join('') : "")]}
                    isClearable
                />
        );
    } else {
        return (
                <Select
                    id={props.schema.id}
                    className={"singleFieldInput"}
                    options={options.enumOptions}
                    defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                        return e.value;
                    }).indexOf(value)]}
                    onChange={handleChange}
                    isClearable={true}
                />
        );
    }


}

export default SelectionFieldWidget;