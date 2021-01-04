import React, {useState, useEffect, useRef} from "react";
import '../../style/style.css'

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function FundBundleFieldTemplate(props) {
    const {id, label, title, required, rawErrors} = props;
    const style = props.formContext.style;
    const properties = props.properties;
    const isFirstRun = useRef(true);
    const [formData, setFormData] = useState();

    //This can be remove, we can make CAD default currency even no value, let backend to do checking
    useEffect(() => {
        if (isFirstRun.current) {
            setFormData(props.formData);
            isFirstRun.current = false;
            return;
        }
        if (props.formData.hasOwnProperty("funding") && props.formData["funding"]) {
            if (!props.formData.hasOwnProperty("currency") || !props.formData["currency"]) {
                props.formData["currency"] = ["CAD", "Canadian Dollar"];
            }
        }
    }, [props.formData])

    return (
        <div className="flex flex-wrap justify-center pt-3">
            <label htmlFor={id}
                   className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2">{title}{required ? "*" : null}</label>
            <div className="flex-grow">
                <div className="fundField">
                    <React.Fragment>{properties[0].content}</React.Fragment>
                    <React.Fragment>{properties[1].content}</React.Fragment>
                </div>

                {(props.formData["funding"] && formData === props.formData && props.formData["currency"][0] !== "CAD") ?
                    <li>Convert to CAD: xxx</li> : null}
            </div>
        </div>
    )
}

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function FundFieldTemplate(props) {
    const {id, label, children, description, errors, help, required, rawErrors} = props;
    const style = props.formContext.style;
    // console.log("MoneyFieldTemplate", props.children);
    return (
        <React.Fragment>
            {children}
            {rawErrors ? rawErrors.map((error, index) => {
                return (<li className={style.msgError} key={index}>{error}</li>)
            }) : null}
        </React.Fragment>
    );
}

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function CurrencyFieldTemplate(props) {
    const {id, label, children, description, errors, help, required, rawErrors} = props;
    const style = props.formContext.style;
    // console.log("CurrencyFieldTemplate", props);
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}