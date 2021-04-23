import React from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import Tooltip from "../../../../Tooltip";
import {tw} from "twind";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const GenericFieldTemplate = (props) => {
    const {label, children, required, rawErrors, schema} = props;

    return (
        <div className={tw`my-3 flex flex-wrap justify-center space-x-6`}>
            <div className={tw`w-1/4 flex flex-grow text-sm font-medium text-gray-700 justify-end`}>
                <div className={tw`flex items-center`}>
                    {label && <label>{label}</label>}
                    {required && <p className={tw`text-red-700 mx-0.5`}>*</p>}
                    {<Tooltip
                        placement="right-start"
                        trigger="hover"
                        delayHide={150}
                        tooltip={
                            schema.description ? <>
                                <div dangerouslySetInnerHTML={{__html: schema.description}}/>
                                <div>{descriptions[schema.field_type]}</div>
                            </> : <div>{label}</div>
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
            <div style={{maxWidth: "20rem"}} className={tw`flex-grow`}>
                {children}
                <div className={rawErrors ? tw`` : tw`hidden`}>
                    {rawErrors ? rawErrors.map((error, index) => {
                        return (<li key={index} className={tw`text-red-600 text-sm`}>{error}</li>)
                    }) : null}
                </div>
            </div>

        </div>
    );
}

export default GenericFieldTemplate;


