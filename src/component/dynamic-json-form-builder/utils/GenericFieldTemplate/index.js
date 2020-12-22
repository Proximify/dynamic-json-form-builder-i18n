import React from 'react';

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const GenericFieldTemplate = (props) => {
    const {id, label, children, required, rawErrors} = props;
    const style = props.formContext.style;
    // console.log("GenericFieldTemplate", props.children);
    return (
        <div className="form-group row justify-content-center mx-auto my-xl-3 my-lg-3 my-md-2 my-sm-2 my-0">
            <label htmlFor={id}
                   className="col-lg-4 col-md-3 col-sm-3 col-10 col-form-label">{label}{required ? "*" : null}</label>
            <div className="col-lg-8 col-md-9 col-sm-9 col-10">
                {children}
                {rawErrors ? rawErrors.map((error, index) => {
                    return (<li className={style.msgError} key={index}>{error}</li>)
                }) : null}
            </div>
        </div>
    );
}

export default GenericFieldTemplate;