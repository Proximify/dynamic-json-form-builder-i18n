import React, {useState, useEffect} from "react";
import 'bootstrap';
import NumberFormat from 'react-number-format';
import '../style/style.css';
import WindowedSelect from "react-windowed-select";
import Select from "react-select";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function FundFieldWidget(props) {
    // console.log("FundFieldWidget", props);
    const [value, setValue] = useState(props.value);

    return (
        <NumberFormat
            className={"form-control fundFieldFund"}
            type="text"
            id={props.schema.id}
            value={value}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={2}
            onValueChange={(valueObj) => {
                if (!props.rawErrors || props.rawErrors.length === 0) {
                    setValue(valueObj.value);
                } else {
                    setValue(valueObj.value);
                    props.onChange(valueObj.value ?? undefined)
                }
            }}
            onBlur={() =>
                props.onChange(value)
            }
        />
    );
}

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CurrencyFieldWidget(props) {
    console.log("CurrencyFieldWidget", props);

    const {options, value} = props;

    const handleChange = (value) => {
        console.log("Selected!!", value);
        if (value === null) {
            props.onChange(undefined);
        } else {
            props.onChange(value.value);
        }
    }

    const formatOptionLabel = ({label, value}) => (
        <table className={"table"} style={{height: "100%", padding: "0", margin: "0"}}>
            <tbody>
            <tr>
                {value.map((val, index)=>{
                    return(
                        <td className={"w-50 pl-2"} key={index}>{val}</td>
                    )
                })}

            </tr>
            </tbody>
        </table>
    );

    return (
        <div>
            <WindowedSelect
                className={"fundFieldCurrency"}
                value={value ? {value: [value[0]]} : {value: [options.enumOptions[0].value[0]]}}
                onChange={handleChange}
                formatOptionLabel={formatOptionLabel}
                defaultValue={value ? options.enumOptions[options.enumOptions.map(function (e) {
                    return e.value;
                }).indexOf(value ?? "")] : options.enumOptions[0]}
                options={options.enumOptions}
            />
        </div>
    );

    // const formatOptionLabel = ({label, value}) => (
    //     <table className={"table"}>
    //         <tbody>
    //         <tr>
    //             {value.map((val, index)=>{
    //                 return(
    //                     <td className={"w-25 p-2"} key={index}>{val}</td>
    //                 )
    //             })}
    //
    //         </tr>
    //         </tbody>
    //     </table>
    // );
    //
    // return (
    //     <div>
    //         <Select
    //             options={enumItems}
    //             onChange={handleChange}
    //             formatOptionLabel={formatOptionLabel}
    //             defaultValue={options.enumOptions[options.enumOptions.map(function (e) {
    //                 return e.value.join('');
    //             }).indexOf((value) ? value.join('') : "")]}
    //             isClearable
    //         />
    //     </div>
    // );
}