import React from 'react';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import {usePopperTooltip} from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import './GenericFieldTemplate.css'

const descriptions = {
    "yearmonth": <p>The day is optional: <strong>yyyy/m</strong>/d.</p>,
    "year": <p><br/>The month is optional: <strong>yyyy</strong>/m. Or both month and day can be
        included: <strong>yyyy</strong>/m/d.</p>
}

const GenericFieldTemplate = (props) => {
    const {id, label, children, required, rawErrors, schema} = props;
    // console.log("GenericFieldTemplate", props);
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible
    } = usePopperTooltip(
        {
            trigger: 'hover',
            interactive: true,
            delayHide: 200,
            placement: 'right'
        }
    );

    return (
        <div className="flex flex-wrap justify-center my-3">
            <div className="w-1/4 flex flex-grow text-base font-medium text-gray-700">
                <div className="flex items-center">
                    <label className="mr-2">{label}</label>
                    <p className="text-red-700">{required && "*"}</p>
                    <div ref={setTriggerRef}>
                        <AiOutlineQuestionCircle/>
                    </div>
                    {visible && (
                        <div
                            ref={setTooltipRef}
                            {...getTooltipProps({className: 'tooltip-container'})}
                        >
                            {/*<div {...getArrowProps({ className: 'tooltip-arrow' })} />*/}
                            {schema.description && <p>{schema.description}</p>}
                            {descriptions[schema.field_type] ?? null}

                        </div>
                    )}
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


