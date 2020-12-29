import React from 'react';
import './GenericFieldTemplate.css'

const GenericFieldTemplate = (props) => {
    const {id, label, children, required, rawErrors} = props;
    // console.log("GenericFieldTemplate", props);
    return (
        // <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5 pt-3">
        //     <label htmlFor={id} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        //         {label}{required ? "*" : null}
        //     </label>
        //     <div className="mt-1 sm:mt-0 sm:col-span-2">
        //         {children}
        //         <div className={`${rawErrors} ? 'hidden' : ''`}>
        //             {rawErrors ? rawErrors.map((error, index) => {
        //                 return (<li className="text-red-600" key={index}>{error}</li>)
        //             }) : null}
        //         </div>
        //     </div>
        // </div>
        <div className="flex flex-wrap justify-center pt-3">
            <label htmlFor={id} className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2">
                {label}{required ? "*" : null}
            </label>
            <div className="flex-grow">
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