import React, {useState, useEffect, useRef} from "react";
import '../style/style.css'

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

    useEffect(() => {
        if (isFirstRun.current) {
            setFormData(props.formData);
            isFirstRun.current = false;
            return;
        }
        if (props.formData.hasOwnProperty("funding") && props.formData["funding"]) {
            if (!props.formData.hasOwnProperty("currency") || !props.formData["currency"]) {
                props.formData["currency"] = "CAD";
            }
        }
    }, [props.formData])

    return (
        <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
            <label htmlFor={id}
                   className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{title}{required ? "*" : null}</label>
            <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                <div className="input-group">
                    <div className={"fundBundleFund"}>{properties[0].content}</div>
                    <div className="input-group-append fundBundleCurrency">{properties[1].content}</div>
                    {(props.formData["funding"] && formData === props.formData && props.formData["currency"] !== "CAD") ?
                        <li>Convert to CAD: xxx</li> : null}
                </div>
                {rawErrors ? rawErrors.map((error, index) => {
                    return (<li className={style.msgError} key={index}>{error}</li>)
                }) : null}
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
        <div>
            {children}
            {rawErrors ? rawErrors.map((error, index) => {
                return (<li className={style.msgError} key={index}>{error}</li>)
            }) : null}
        </div>
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
    // console.log("MoneyFieldTemplate", props.children);
    return (
        <div>
            {children}
        </div>
    );
}