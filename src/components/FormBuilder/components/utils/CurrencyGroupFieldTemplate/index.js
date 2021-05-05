import React from "react";
import {tw} from 'twind';
import {FieldContainer, FieldControlContainer, FieldLabelContainer} from "../twindClass";
import Tooltip from "../Tooltip";
import {AiOutlineQuestionCircle} from "react-icons/ai";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const fieldNeedByReport = (fieldName, reports) => {
    const reportsNeedFields = [];
    for (const [reportId, report] of Object.entries(reports)) {
        if (report.fields.includes(fieldName)) {
            reportsNeedFields.push({reportName: report.name, color: report.color});
        }
    }
    return reportsNeedFields;
}

export function CurrencyGroupFieldTemplate(props) {
    const {schema, formData, formContext} = props;
    const properties = props.properties;
    let groupFieldLabel = "";
    let groupFieldDescription = "";
    let groupFieldFieldType = "";
    let groupFieldMandatory = false;
    let amountFieldContent = null;
    let currencyFieldContent = null;
    let convertAmountFieldName = "";
    let reportsNeedField = [];
    for (const [, field] of Object.entries(schema.properties)) {
        if (field.currencyField === 'amount') {
            groupFieldLabel = field.title;
            reportsNeedField = fieldNeedByReport(field.name, formContext.reports);
            groupFieldDescription = field.description;
            groupFieldMandatory = field.mandatory;
            groupFieldFieldType = field.field_type;
        }
        if (field.currencyField === 'convertedAmount') {
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
        <>
            <div className={tw`${FieldContainer}`}>
                <div className={tw`${FieldLabelContainer}`}>
                    {reportsNeedField.map((report, index) => {
                        return (<Tooltip
                            key={index}
                            placement="left-start"
                            trigger="hover"
                            delayHide={100}
                            tooltip={
                                <p className={tw`text-sm`}>Field used by: {report.reportName}</p>
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
                        <span className={tw`inline-block rounded-lg border-solid h-2 w-2 mr-2 mb-0.5`}
                                  style={{backgroundColor: `${report.color}`}}/>
                        </Tooltip>)
                    })}
                    {groupFieldLabel &&
                    <label className={tw`text-right text-sm font-medium text-gray-700`}>{groupFieldLabel}</label>}
                    {groupFieldMandatory && <p className={tw`text-red-700 mx-0.5`}>*</p>}
                </div>
                <div className={tw`${FieldControlContainer}`}>
                    <div className={"currencyFieldControl"}>
                        <>{amountFieldContent}</>
                        <>{currencyFieldContent}</>
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
                            <AiOutlineQuestionCircle className={tw`text-gray-300 mx-2 hover:text-gray-400`} size={'1.2em'}/>
                        </Tooltip>}
                    </div>
                    <div
                        className={tw`justify-end text-sm text-gray-500`}>
                        {formData[convertAmountFieldName] &&
                        <p className={tw``}>C$ {Number(formData[convertAmountFieldName]).toFixed(2)} (calculated on save)</p>}
                    </div>
                </div>
            </div>


        </>
    )
}

export function AmountInputTemplate(props) {
    const {children, rawErrors} = props;

    return (
        <>
            {children}
            {rawErrors ? rawErrors.map((error, index) => {
                return (<li key={index} className={tw`text-red-600 text-sm w-72`}>{error}</li>)
            }) : null}
        </>
    );
}


export function CurrencySelectTemplate(props) {
    const {children} = props;
    return (
        <>
            {children}
        </>
    );
}
