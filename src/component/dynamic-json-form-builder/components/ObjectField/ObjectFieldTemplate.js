import React from "react";
import Formatters from '../utils/formatters';
import './ObjectField.css'

export default function ObjectFieldTemplate(props) {
    const {id, schema, title, required, rawErrors, properties, formData, formContext} = props;
    console.log(props)
    return (
        <div className="flex flex-wrap justify-center pt-3">
            <label htmlFor={id}
                   className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2 pl-2">
                {title}{required ? "*" : null}
            </label>
            <div className="flex-grow" style={{maxWidth: "25rem"}}>
                {/*{props.properties.map((element, index) => {*/}
                {/*    return (<div className={`col-${12 / props.properties.length} px-0 ${index > 0 ? "pl-2" : ""}`}*/}
                {/*                 key={index}>{element.content}</div>)*/}
                {/*})}*/}

                <div className="objectField">
                    <Formatters app={formContext.app} form={formContext.form} section={schema.id} fields={properties} values={formData}/>
                </div>
            </div>
            <div className={`${rawErrors} ? 'hidden' : ''`}>
                {rawErrors ? rawErrors.map((error, index) => {
                    return (<li className="text-red-600" key={index}>{error}</li>)
                }) : null}
            </div>
        </div>
    )
}