import React from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import Tooltip from "../Tooltip";
import {tw} from "twind";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const GenericFieldTemplate = (props) => {
    const {label, children, rawErrors, schema, formContext, formData} = props;

    return (
        <div className={tw`my-3 flex justify-between`}>
            <div className={tw`w-5/12 flex justify-end`}>
                <div className={tw`flex items-center text-base font-semibold text-gray-700`}>
                    {label && <label className={tw`text-right`}>{label}</label>}
                    {schema.mandatory && <p className={tw`text-red-700 mx-0.5`}>*</p>}
                    {<Tooltip
                        placement="right-start"
                        trigger="hover"
                        delayHide={150}
                        tooltip={
                            schema.description ? <div className={tw`text-sm`}>
                                <p dangerouslySetInnerHTML={{__html: schema.description}}/>
                                <p>{descriptions[schema.field_type]}</p>
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
                        <AiOutlineQuestionCircle className={tw`text-gray-400 mx-1`} size={'1.1em'}/>
                    </Tooltip>}
                </div>
            </div>
            <div className={tw`w-7/12 max-w-sm sm:(pl-4 pr-6) xl:(pl-0 pr-14)`}>
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

        </div>
    );
}

export default GenericFieldTemplate;


