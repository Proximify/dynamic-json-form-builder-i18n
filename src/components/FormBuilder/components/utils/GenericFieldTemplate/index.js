import React from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import Tooltip from "../Tooltip";
import {tw} from "twind";
import {FieldActionContainer, FieldContainer, FieldControlContainer, FieldLabelContainer} from "../twindClass";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const GenericFieldTemplate = (props) => {
    const {label, children, rawErrors, schema, formContext, formData} = props;

    return (
        <div className={tw`${FieldContainer}`}>
            <div className={tw`${FieldLabelContainer}`}>
                {label && <label className={tw`text-right`}>{label}</label>}
                {schema.mandatory && <p className={tw`text-red-700 mx-0.5`}>*</p>}
            </div>

            <div className={tw`${FieldControlContainer}`}>
                {children}
                <div className={tw`${rawErrors ? '' : 'hidden'}`}>
                    {rawErrors ? rawErrors.map((error, index) => {
                        if (!error.includes("is required")) {
                            return (<li key={index} className={tw`text-red-600 text-sm`}>{error}</li>)
                        }
                    }) : null}
                    {schema.mandatory && formContext.mandatoryFieldValidation && !formData &&
                    <li className={tw`text-red-600 text-sm`}>{`${label} is required`}</li>}
                </div>
            </div>
            <div className={tw`${FieldActionContainer}`}>
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
                    <AiOutlineQuestionCircle className={tw`text-gray-400 mx-1`} size={'1.2em'}/>
                </Tooltip>}
            </div>
        </div>
    );
}

export default GenericFieldTemplate;


