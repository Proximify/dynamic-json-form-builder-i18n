import React from 'react';

const GenericFieldTemplate = (props) => {
    const {id, label, children, required, rawErrors} = props;
    // console.log("GenericFieldTemplate", props);
    return (
        <div className="flex flex-wrap justify-center pt-3">
            <label htmlFor={id} className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2 pl-2">
                {label}{required ? "*" : null}
            </label>
            <div className="flex-grow" style={{maxWidth: "20rem"}}>
                {children}
            </div>
            <div className={`${!rawErrors ? 'hidden' : ''}`}>
                {rawErrors ? rawErrors.map((error, index) => {
                    return (<li className="text-red-600" key={index}>{error}</li>)
                }) : null}
            </div>
        </div>
    );
}

export default GenericFieldTemplate;