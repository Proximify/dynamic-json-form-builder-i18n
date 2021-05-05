import React from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import Tooltip from "../Tooltip";
import {tw} from "twind";
import {FieldContainer, FieldControlContainer, FieldLabelContainer} from "../twindClass";

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

const GenericFieldTemplate = (props) => {
    const {label, children, rawErrors, schema, formContext, formData} = props;
    const reportsNeedField = fieldNeedByReport(schema.name, formContext.reports);
    return (
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
                {label && <label className={tw`text-right text-sm font-medium text-gray-700`}>{label}</label>}
                {schema.mandatory && <p className={tw`text-red-700 mx-0.5`}>*</p>}
            </div>
            <div className={tw`${FieldControlContainer}`}>
                <div className={"fieldControl"}>
                    {children}
                    {<Tooltip
                        placement="right-start"
                        trigger="hover"
                        delayHide={150}
                        tooltip={
                            schema.description ? <div className={tw`text-sm`}>
                                <div dangerouslySetInnerHTML={{__html: schema.description}}/>
                                <div>{descriptions[schema.field_type]}</div>
                            </div> : <div className={tw`text-sm`}>{label}</div>
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
                <div className={tw`${rawErrors ? '' : 'hidden'}`}>
                    {rawErrors ? rawErrors.map((error, index) => {
                        return (<li key={index} className={tw`text-red-600 text-sm w-72`}>{error}</li>)
                    }) : null}
                </div>
            </div>

        </div>
    );
}

export default GenericFieldTemplate;


