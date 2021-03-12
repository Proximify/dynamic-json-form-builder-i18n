import React, {useState, useEffect, useRef} from 'react';
import Select from "react-select";
import WindowedSelect, {components} from "react-windowed-select";
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
    onChange(!value ? undefined : JSON.stringify(value.value))
    // onChange(!value ? undefined : value.value)
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
            // defaultValue={value ?
            //     options.enumOptions[options.enumOptions.map(element => {
            //             const tempEle = [...element.value];
            //             const option_id = tempEle.shift();
            //             const option_content = tempEle.join('|');
            //             return [option_id, option_content, null].toString();
            //         }
            //     ).indexOf(value.toString())]
            //     : null}
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
    // console.log("SingleLargeSelectionWidget", props)
    const {value} = props;
    const lovOptions = props.formContext.lovOptions[props.schema.subtype_id].map(opt => {
        return {label: opt.toString(), value: opt}
    });
    const lovValue = value ? JSON.parse(value) : undefined;
    // console.log(lovOptions, value);
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

    // const {options, value} = props;
    // return (
    //     <WindowedSelect id={props.schema.id}
    //                     getOptionLabel={option => option.value[1] ?? option.label}
    //                     className={"singleFieldSelect"}
    //                     options={options.enumOptions}
    //                     defaultValue={value ?
    //                         options.enumOptions[options.enumOptions.map(element =>
    //                             element.value.toString()
    //                         ).indexOf(value.toString())]
    //                         : null}
    //                     onChange={value => handleChange(value, props.onChange)}
    //                     isClearable={true}/>
    // );
}

export function MultiColLargeSelectionWidget(props) {
    console.log("MultiColLargeSelectionWidget", props)
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
        return (<div className={`py-${3 * (value.length - 1)}`}>
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
            // styles={customStyles}
            onChange={value => handleChange(value, props.onChange)}
            // defaultValue={value ?
            //     options.enumOptions[options.enumOptions.map(element => {
            //             const tempEle = [...element.value];
            //             const option_id = tempEle.shift();
            //             const option_content = tempEle.join('|');
            //             return [option_id, option_content, null].toString();
            //         }
            //     ).indexOf(value.toString())]
            //     : null}
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