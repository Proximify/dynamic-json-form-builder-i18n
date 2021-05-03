// import React from 'react';
// import {AiOutlineQuestionCircle} from 'react-icons/ai';
// import Tooltip from "../Tooltip";
// import {tw} from "twind";
// import {
//     CurrencyFieldActionContainer,
//     CurrencyFieldContainer, CurrencyFieldControlContainer, CurrencyFieldLabelContainer,
//     FieldActionContainer,
//     FieldContainer,
//     FieldControlContainer,
//     FieldLabelContainer
// } from "../twindClass";
//
// const descriptions = {
//     "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
//     "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
//         included: <strong>yyyy</strong>/m/d.</p>
// }
//
// const CurrencyFieldTemplate = (props) => {
//
//     const {label, children, rawErrors, schema, formContext, formData} = props;
//     const {currencyField} = schema;
//
//     return (
//         <CurrencyFieldContainer fieldType={currencyField}>
//             <CurrencyFieldLabelContainer fieldType={currencyField}>
//                 {label && <label className={tw`text-right`}>{label}</label>}
//                 {schema.mandatory && <p className={tw`text-red-700 mx-0.5`}>*</p>}
//             </CurrencyFieldLabelContainer>
//
//             <CurrencyFieldControlContainer fieldType={currencyField} style={{paddingTop: `${currencyField=== 'currency' && '0rem'}`}}>
//                 {children}
//                 <div className={tw`${rawErrors ? '' : 'hidden'}`}>
//                     {rawErrors ? rawErrors.map((error, index) => {
//                         if (!error.includes("is required")) {
//                             return (<li key={index} className={tw`text-red-600 text-sm`}>{error}</li>)
//                         }
//                     }) : null}
//                     {schema.mandatory && formContext.mandatoryFieldValidation && !formData &&
//                     <li className={tw`text-red-600 text-sm`}>{`${label} is required`}</li>}
//                 </div>
//             </CurrencyFieldControlContainer>
//             <CurrencyFieldActionContainer fieldType={currencyField}>
//                 {<Tooltip
//                     placement="right-start"
//                     trigger="click"
//                     delayHide={150}
//                     tooltip={
//                         schema.description ? <div className={tw`text-sm`}>
//                             <div dangerouslySetInnerHTML={{__html: schema.description}}/>
//                             <div>{descriptions[schema.field_type]}</div>
//                         </div> : <div className={tw`text-sm`}>{label}</div>
//                     }
//                     hideArrow={true}
//                     modifiers={[
//                         {
//                             name: "offset",
//                             enabled: true,
//                             options: {
//                                 offset: [0, 8]
//                             }
//                         }
//                     ]}
//                 >
//                     <AiOutlineQuestionCircle className={tw`text-gray-400 mx-1`} size={'1.2em'}/>
//                 </Tooltip>}
//             </CurrencyFieldActionContainer>
//         </CurrencyFieldContainer>
//     );
// }
//
// export default CurrencyFieldTemplate;


const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

import React, {useState} from "react";
import {tw} from 'twind';
import {FieldActionContainer, FieldContainer, FieldControlContainer, FieldLabelContainer} from "../twindClass";
import Tooltip from "../Tooltip";
import {AiOutlineQuestionCircle} from "react-icons/ai";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function FundingGroupFieldTemplate(props) {
    const {schema, formData} = props;
    const properties = props.properties;
    let groupFieldLabel = "";
    let groupFieldDescription = "";
    let groupFieldFieldType = "";
    let groupFieldMandatory = false;
    let amountFieldContent = null;
    let currencyFieldContent = null;
    let convertAmountFieldName = "";
    for (const [, field] of Object.entries(schema.properties)) {
        if (field.currencyField === 'amount') {
            groupFieldLabel = field.title;
            groupFieldDescription = field.description;
            groupFieldMandatory = field.mandatory;
            groupFieldFieldType = field.field_type;
        }
        if (field.currencyField === 'convertedAmount'){
            convertAmountFieldName = field.name;
        }
    }

    properties.forEach(property => {
        if (property.content.props.schema.currencyField === 'amount') {
            amountFieldContent = property.content;
        } else if (property.content.props.schema.currencyField === 'currency') {
            currencyFieldContent = property.content;
        }
    })

    return (
        <div>
            <div className={tw`${FieldContainer} mb-0!`}>
                <div className={tw`${FieldLabelContainer}`}>
                    {groupFieldLabel && <label className={tw`text-right`}>{groupFieldLabel}</label>}
                    {groupFieldMandatory && <p className={tw`text-red-700 mx-0.5`}>*</p>}
                </div>
                <div className={tw`${FieldControlContainer} flex`}>
                    <>{amountFieldContent}</>
                    <>{currencyFieldContent}</>
                </div>
                <div className={tw`${FieldActionContainer}`}>
                    {<Tooltip
                        placement="right-start"
                        trigger="hover"
                        delayHide={150}
                        tooltip={
                            groupFieldDescription ? <div className={tw`text-sm`}>
                                <div dangerouslySetInnerHTML={{__html: groupFieldDescription}}/>
                                <div>{descriptions[groupFieldFieldType]}</div>
                            </div> : <div className={tw`text-sm`}>{groupFieldLabel}</div>
                        }
                        hideArrow={true}
                        modifiers={[
                            {
                                name: "offset",
                                enabled: true,
                                options: {
                                    offset: [0, 8]
                                }
                            }
                        ]}
                    >
                        <AiOutlineQuestionCircle className={tw`text-gray-200 mx-1 hover:text-gray-400`} size={'1.2em'}/>
                    </Tooltip>}
                </div>
            </div>
            <div
                className={tw`xl:(mr-24) lg:(ml-14 mr-14) md:(mr-16 my-0 flex justify-end text-sm text-gray-500) sm:(ml-12 mr-10 my-1)`}>
                {formData[convertAmountFieldName] && <p className={tw``}>C$ {Number(formData[convertAmountFieldName]).toFixed(2)} (calculated on save)</p>}
            </div>

        </div>
    )
}

export function FundingFieldTemplate(props) {
    const {children, rawErrors} = props;

    return (
        <>
            {children}
            {rawErrors ? rawErrors.map((error, index) => {
                return (<li key={index}>{error}</li>)
            }) : null}
        </>
    );
}


export function CurrencyFieldTemplate(props) {
    const {children} = props;
    return (
        <>
            {children}
        </>
    );
}
