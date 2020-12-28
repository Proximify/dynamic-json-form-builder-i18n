import React from 'react';
import './GenericFieldTemplate.css'

const GenericFieldTemplate = (props) => {
    const {id, label, children, required, rawErrors} = props;
    // console.log("GenericFieldTemplate", props);
    return (

        // <div className={"grid grid-cols-7 gap-2 my-4"}>
        //     <div className="col-start-2 my-auto">
        //         <label htmlFor={id}
        //                className="block font-medium text-gray-700 m-0">{label}{required ? "*" : null}</label>
        //     </div>
        //     <div className={"col-start-4 col-span-3"}>
        //         <div className="max-w-xs">
        //             {children}
        //         </div>
        //         <div className={`${rawErrors} ? 'hidden' : ''`}>
        //             {rawErrors ? rawErrors.map((error, index) => {
        //                 return (<li className="text-red-600" key={index}>{error}</li>)
        //             }) : null}
        //         </div>
        //     </div>
        //
        // </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pt-3">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                {label}{required ? "*" : null}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                {children}
                <div className={`${rawErrors} ? 'hidden' : ''`}>
                    {rawErrors ? rawErrors.map((error, index) => {
                        return (<li className="text-red-600" key={index}>{error}</li>)
                    }) : null}
                </div>
            </div>
        </div>
    );
}

export default GenericFieldTemplate;