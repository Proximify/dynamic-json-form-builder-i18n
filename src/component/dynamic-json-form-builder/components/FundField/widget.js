import React, {useState, useEffect} from "react";
import NumberFormat from 'react-number-format';
import './FundField.css';
import WindowedSelect from "react-windowed-select";

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
            className={"fundFieldInput"}
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
    // console.log("CurrencyFieldWidget", props);

    const {options, value} = props;

    const handleChange = (value) => {
        console.log("Selected!!", value);
        if (value === null) {
            props.onChange(undefined);
        } else {
            props.onChange(value.value);
        }
    }

    const style = {
        control: base => ({
            ...base,
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            borderTopRightRadius: '0.375rem',
            borderBottomRightRadius: '0.375rem',
            borderLeft: '0',
            borderColor: 'rgba(209, 213, 219, var(--tw-border-opacity))'
        })
    };

    const formatOptionLabel = ({label, value}) => (
        <table>
            <tbody>
            <tr>
                <td className="currencyFieldCode">{value[0]}</td>
            </tr>
            <tr>
                <td className="currencyFieldName">{value[1]}</td>
            </tr>
            </tbody>
        </table>
    );

    return (
        <WindowedSelect
            className={"fundFieldSelect"}
            value={value ? {value: [value[0]]} : {value: [options.enumOptions[0].value[0]]}}
            styles={style}
            onChange={handleChange}
            formatOptionLabel={formatOptionLabel}
            defaultValue={value ? options.enumOptions[options.enumOptions.map(function (e) {
                return e.value;
            }).indexOf(value ?? "")] : options.enumOptions[0]}
            options={options.enumOptions}
        />
    );
}