import React, {useState, useEffect} from "react";
import 'bootstrap';
import NumberFormat from 'react-number-format';
import '../style/style.css';

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function FundFieldWidget(props) {
    console.log("TextInputWidget", props);
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
    return (
        <div className="btn-group dropdown">
            <a type="button" className="btn btn-secondary dropdown-toggle fundFieldCurrency" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
                {props.value ?? "CAD"}
            </a>
            <div className="dropdown-menu">
                {props.options.enumOptions.map((element, index) => {
                    return (
                        <a className={`dropdown-item ${((props.value ?? "CAD") === element.value) ? "active" : ""}`}
                           href="#"
                           key={index} onClick={(e) => {
                            e.preventDefault();
                            props.onChange(element.value);
                        }}>
                            {element.value}
                        </a>
                    )
                })}
            </div>
        </div>
    );
}