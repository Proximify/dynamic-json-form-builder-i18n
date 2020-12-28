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
                <div className="max-w-lg flex rounded-md shadow-sm">
                    <WindowedSelect
                        id={props.schema.id}
                        className={"max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full md:max-w-lg shadow-sm sm:max-w-xs border-gray-300 rounded-md"}
                        options={options.enumOptions}
                        isClearable={true}
                        onChange={handleChange}
                        defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                            return e.value;
                        }).indexOf(value)]}
                    />
                </div>
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
            <div className="max-w-lg flex rounded-md shadow-sm">
                <Select
                    className={"max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full md:max-w-lg shadow-sm sm:max-w-xs border-gray-300 rounded-md"}
                    id={props.schema.id}
                    options={options.enumOptions}
                    onChange={handleChange}
                    formatOptionLabel={formatOptionLabel}
                    defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                        return e.value.join('');
                    }).indexOf((value) ? value.join('') : "")]}
                    isClearable
                />
            </div>
        );
    } else {
        return (
            <div className="max-w-lg flex rounded-md shadow-sm">
                <Select
                    id={props.schema.id}
                    className={"max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full md:max-w-lg shadow-sm sm:max-w-xs border-gray-300 rounded-md"}
                    options={options.enumOptions}
                    defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
                        return e.value;
                    }).indexOf(value)]}
                    onChange={handleChange}
                    isClearable={true}
                />
            </div>
        );
    }


}

export default SelectionFieldWidget;