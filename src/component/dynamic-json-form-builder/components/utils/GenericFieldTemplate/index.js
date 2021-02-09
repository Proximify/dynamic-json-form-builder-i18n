import React from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import './GenericFieldTemplate.css'
import Tooltip from "../../../../Tooltip";

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const GenericFieldTemplate = (props) => {
    const {id, label, children, required, rawErrors, schema} = props;
    // console.log("GenericFieldTemplate", props);


    return (
        <div className="flex flex-wrap justify-center my-3">
            <div className="w-1/4 flex flex-grow text-base font-medium text-gray-700">
                <div className="flex items-center">
                    <label className="mr-2">{label}</label>
                    <p className="text-red-700">{required && "*"}</p>
                    <Tooltip
                        placement="right-start"
                        trigger="hover"
                        delayHide={200}
                        tooltip={
                            <>
                                <p>{schema.description}</p>
                                <p>{descriptions[schema.field_type]}</p>
                            </>
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
                        <AiOutlineQuestionCircle/>
                    </Tooltip>
                </div>
            </div>
            <div className="flex-grow" style={{maxWidth: "20rem"}}>
                {children}
                <div className={`${!rawErrors ? 'hidden' : ''}`}>
                    {rawErrors ? rawErrors.map((error, index) => {
                        return (<li className="text-red-600" key={index}>{error}</li>)
                    }) : null}
                </div>
            </div>

        </div>
    );
}

export default GenericFieldTemplate;


