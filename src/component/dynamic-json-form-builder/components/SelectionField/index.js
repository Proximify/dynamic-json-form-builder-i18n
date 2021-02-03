import React, {useState, useEffect, useRef} from 'react';
import Select from "react-select";
import WindowedSelect from "react-windowed-select";
import './SelectionField.css'

const monthOpts = [
    {label: "January", value: 1, lastDay: 31},
    {label: "February", value: 2, lastDay: 28},
    {label: "March", value: 3, lastDay: 31},
    {label: "April", value: 4, lastDay: 30},
    {label: "May", value: 5, lastDay: 31},
    {label: "June", value: 6, lastDay: 30},
    {label: "July", value: 7, lastDay: 31},
    {label: "August", value: 8, lastDay: 31},
    {label: "September", value: 9, lastDay: 30},
    {label: "October", value: 10, lastDay: 31},
    {label: "November", value: 11, lastDay: 30},
    {label: "December", value: 12, lastDay: 31}
];

const dayOpts = (monthOpts, monthIndex) => {
    return (Array.from({length: 31}, (_, i) => {
            return {
                label: i + 1,
                value: i + 1,
                disabled: monthIndex ? (i + 1 > monthOpts[monthIndex].lastDay) : false
            }
        }
    ))
};

const handleChange = (value, onChange) => {
    onChange(!value ? undefined : value.value)
}

export function SingleSelectionWidget(props) {
    const {options, value} = props;
    return (
        <Select
            id={props.schema.id}
            getOptionLabel={option => option.value[1] ?? option.label}
            className={"singleFieldSelect"}
            options={options.enumOptions}
            defaultValue={value ? options.enumOptions[options.enumOptions.map(function (e) {
                return e.value[1];
            }).indexOf(value[1])] : null}
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
            className={"singleFieldSelect"}
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
            className={"singleFieldSelect"}
            options={options.enumOptions}
            isClearable={true}
            onChange={value => handleChange(value, props.onChange)}
            defaultValue={value ? options.enumOptions[options.enumOptions.map(function (e) {
                return e.value[1];
            }).indexOf(value[1])] : null}
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
            className={"singleFieldSelect"}
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

export function DOBSelectionWidget(props) {
    const [value, setValue] = useState(props.value ? {
        monthIndex: Number(props.value.split("/")[0]) ? Number(props.value.split("/")[0]) - 1 : null,
        dayIndex: Number(props.value.split("/")[1]) ? Number(props.value.split("/")[1]) - 1 : null
    } : "");

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (value.monthIndex === null && value.dayIndex === null) {
            props.onChange(undefined);
        } else {
            let result = "";
            if (value.monthIndex) {
                result += monthOpts[value.monthIndex].value
            }
            result += "/";
            if (value.dayIndex) {
                result += dayOpts(monthOpts, value.monthIndex)[value.dayIndex].value
            }
            props.onChange(result);
        }
    }, [value])

    console.log("----", value)
    return (
        <div className="DOBField space-x-4" style={{minWidth: "16rem"}}>
            <Select
                id={`${props.schema.id}_month`}
                className={"DOBMonth"}
                options={monthOpts}
                defaultValue={value.monthIndex ? monthOpts[value.monthIndex] : null}
                onChange={val => {
                    setValue({
                        ...value,
                        monthIndex: val ? val.value - 1 : null
                    })
                }}
                isClearable={true}
            />
            <Select
                id={`${props.schema.id}_day`}
                options={dayOpts(monthOpts, value.monthIndex)}
                className={"DOBMonth"}
                defaultValue={value.dayIndex ? dayOpts(monthOpts, value.monthIndex)[value.dayIndex] : null}
                onChange={val => setValue({
                    ...value,
                    dayIndex: val ? val.value - 1 : null
                })}
                isOptionDisabled={(option) => option.disabled === true}
                isClearable={true}
            />
        </div>
    );
}