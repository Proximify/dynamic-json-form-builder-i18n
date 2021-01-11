import React, {useState} from "react";
import Formatter from '../utils/formatter';
import './ObjectField.css'
import {PlusCircleIcon} from "@primer/octicons-react";
import ModalRegular from "../utils/Modals";

export default function ObjectFieldTemplate(props) {
    const {id, schema, title, required, rawErrors, properties, formData, formContext} = props;
    console.log("ObjectFieldTemplate", props)
    const [state, setState] = useState({
        open: false,
        edit: false,
        dataPrevious: (formData && Object.keys(formData).length > 0) ? formData : null
    });

    function isFormDataEmpty() {
        if (!formData) {
            return true;
        } else if (formData && Object.keys(formData).length === 0) {
            return true;
        } else {
            let noValue = true
            Object.values(formData).forEach(value => {
                if (value && value !== "" && value !== undefined) {
                    noValue = false;
                }
            })
            return noValue
        }
    }

    const restoreData = () => {
        console.log(state.dataPrevious, formData)
        if (state.dataPrevious === null) {
            properties.forEach(element => {
                element.content.props.onChange(undefined);
            })
            console.log(formData)
        }
    }

    return (
        <div className="flex flex-wrap justify-center pt-3">
            <label htmlFor={id}
                   className="w-1/4 flex-grow text-sm font-medium text-gray-700 pt-2 pl-2">
                {title}{required ? "*" : null}
            </label>
            <div className="flex-grow" style={{maxWidth: "25rem"}}>
                <div className="sectionData">
                    {!isFormDataEmpty() ?
                        <div>
                            <div>
                                <strong>Address: </strong>
                            </div>
                            <div onClick={() => {
                                setState({
                                    ...state,
                                    open: true,
                                    edit: true,
                                    dataPrevious: isFormDataEmpty() ? null : formData
                                })
                            }}>
                                <Formatter app={formContext.app} form={formContext.form} section={schema.id}
                                           fields={properties} values={formData}/>
                            </div>
                        </div>
                        :
                        <a type="button" className="text-blue-600" onClick={() => {
                            setState({
                                ...state,
                                open: true,
                                edit: false
                            })
                        }}>< PlusCircleIcon
                            size={16}/>
                        </a>
                    }
                </div>
                <div id={`${title}_modal`}>
                    {state.open ?
                        <ModalRegular state={state} setState={setState} restoreData={restoreData} content={properties} title={title}/> : null}
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